/*
  Test file for mongoose.
   The DB must be tested separated from GET requests, as far as I can see.
    this is because we can´t open same mongoose model in two files, the original
    (in the express server) and here. Needs more research or chan ge the paradigm 
    and test it separated (bd and connection-express)

    ok - file not included

*/

//"mongodb://Daniel:harmonia.900@cluster0-shard-00-00-muruw.mongodb.net:27017,cluster0-shard-00-01-muruw.mongodb.net:27017,cluster0-shard-00-02-muruw.mongodb.net:27017/MAIN?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin";

var request = require('supertest'),
    assert  = require('assert'),
    debug   = require('debug')('tempmon:test'),
    app     = require('../../app');

var dbURI    = "mongodb://Daniel:harmonia.900@cluster0-shard-00-00-muruw.mongodb.net:27017,cluster0-shard-00-01-muruw.mongodb.net:27017,cluster0-shard-00-02-muruw.mongodb.net:27017/TEST?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin";
var    should   = require('chai').should();
//var mongoose = require('mongoose');
var mongoose = require('../../db/mongoose');


mongoose.Promise = Promise;

var Schema = mongoose.Schema;
var ModelSchema = new Schema({
    node_id:      Number,
    time:         Number,
    temperature:  String,
    humidity:     String,
    state:        String
  });


//TODO
// importar a definicao do db para usar aqui sem traumas, pois estamos agora
//  usando o esquema daqui e no .get pega o esquema do programa principal.

var Dummy    = mongoose.model('Dummy', ModelSchema); //funcionou +-
//var Dummy = require('../../models/Device_data_thModel').mongooseModel(mongooseB);


describe("Example spec for a model", function() {
  beforeEach(function(done) {
    this.timeout(5000); //Time to connect
    if (mongoose.connection.db) return done();
    mongoose.connect(dbURI, { useMongoClient: true }, done);
  });



  it("can be saved", function(done) {
    new Dummy({node_id: 0}).save(done);
  });

  it("can be listed", function(done) {
    new Dummy({node_id: 1}).save(function(err, model){
      if (err) return done(err);

      new Dummy({node_id: 2}).save(function(err, model){
        if (err) return done(err);

        Dummy.find({}, function(err, docs){
          if (err) return done(err);

          debug("Docs "+docs);

          // without clearing the DB between specs, this would be 3
          docs.length.should.equal(3);
          done();
        });
      });
    });
  });

  //Clear
  after(function(done) {
    Dummy.remove({ }, function (err) {
      if (err) return done(err);
      done();
    });
  });

  it("can clear the DB on demand", function(done) {
    new Dummy({node_id: 5}).save(function(err, model){
      if (err) return done(err);

        //clearDB(function(err){
        //Dummy.remove({}).exec(function(err, result) {
        Dummy.remove({ }, function (err) {
        if (err) return done(err);

        Dummy.find({}, function(err, docs){
          if (err) return done(err);

          debug(docs);

          docs.length.should.equal(0);
          done();
        });
      });
    });
  });


  it('GET /device_data_th | returns all data', function(done) {
    this.timeout(10000);

    var testData = [
          {node_id : 500, time : 1499981330556, temperature: "27"},
          {node_id : 400, time : 350, humidity: "55"},
          {node_id : 600, humidity: "15"}
        ];

    //new Dummy({node_id: 50}).save(function(err, model){
    new Dummy({node_id : 500, time : 1499981330556, temperature: "27"}).save(function(err, model){
      if (err) return done(err);
      console.log("dentro GET -pegando dados de qual esquema??");
      request(app)
        .get('/device_data_th/')
        .end(function(err, response) {
          if (err) return done(err);
          console.log("Dentro "+ response.body[0].node_id+":"+ response.body[0].time);
          var body = response.body;
          console.log("Dentro "+err +"--"+ body[0].node_id+":"+ body[0].time);
          assert.equal(body.length, 2);
          assert.equal(body[0].node_id, 500);
          assert.equal(body[0].time, 1499981330556);
          assert.equal(body[1].humidity, "27");
          done();
        });
      });
  });
});
