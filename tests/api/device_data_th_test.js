'use strict';

var request = require('supertest'),
    assert  = require('assert'),
    debug   = require('debug')('livro_nodejs:test'),
    app     = require('../../app'),
    mongoose= require('../../db/mongoose');


console.log("A"+mongoose.connection.readyState);

/*
  // Save the new model instance, passing a callback
  awesome_instance.save(function (err, result) {
    console.log("3"+JSON.stringify(result));
    if (err) throw err;
    console.log('User created!');
  });
  */

describe('Stormtroopers Endpoints', function () {
  before(function(done) {
    //Needed for could db connection
    this.timeout(5000);

console.log("C"+mongoose.connection.readyState);



setTimeout(function(){

  console.log("Hello");
  if  (mongoose.connection.readyState==1) {

    // Compile model from schema
    var Device_data_thTest = mongoose.model('Device_data_thTest', {
        node_id:      Number,
        time:         Number,
        temperature:  String,
        humidity:     String,
        state:        String
      });

      //Test data
      var deviceData = {
          "node_id":      10,
          "time":         9090909090,
          "temperature":  "25",
          "humidity":     "60",
          "state":        "Op/Ok"
      };

      // Create an instance of model Device_data_thTest
      var model = new Device_data_thTest (deviceData);

    console.log("1"+JSON.stringify(Device_data_thTest));
    console.log("2"+JSON.stringify(model));

    model.save(function (err, result) {
      console.log("3"+JSON.stringify(result));
      if (err) throw err;
      console.log('User created!');
    });

    done();
  }

}, 5000);


/*


    var stormtroopers = [
          { name : "CT-1010", nickname : "Fox" },
          { nickname : "Hardcase" },
          { name : "CT-2224", nickname : "Cody" }
        ];*/
/*
    mongo.collection('stormtroopers').insert(stormtroopers, function(err, data) {
        if (err) {
          throw err;
        }
        debug("Describe.." + JSON.stringify(data));
        done();
    });
    */

  });

  afterEach(function(done) {
    mongo.collection('stormtroopers').remove({}, done);
  });
  it('GET /stormtroopers | returns all clones', function(done) {
       this.timeout(5000);
    request(app)
      .get('/stormtroopers')
      .end(function(err, response) {
        var body = response.body;
        assert.equal(body.length, 3);
        assert.equal(body[0].name, 'CT-1010');
        assert.equal(body[0].nickname, 'Fox');
        done();
      });
  });
  it('GET /stormtroopers/:_id', function(done) {
       this.timeout(5000);
    insert(function(err, result) {
      var _id = result._id;
      request(app)
        .get('/stormtroopers/' + _id)
        .end(function(err, response) {
          var body = response.body;
          delete body._id;
          assert.deepEqual(body, { name: 'CT-7567', nickname: 'Rex', divisions: [] });
          done();
        });
    });
  });
  it('GET /stormtroopers/:_id not found', function(done) {
       this.timeout(5000);
    var _id = '55555aaaaa55555aaaaa4444';
    request(app)
      .get('/stormtroopers/' + _id)
      .set('Accept', 'application/json')
      .expect(200)
      .end(function(err, response) {
        var body = response.body
        assert.equal(response.statusCode, 404);
        done();
      });
  });
  it('POST /stormtroopers', function(done) {
       this.timeout(5000);
    var fives = { name : "CT-27-5555", nickname : "Fives" };
    request(app)
      .post('/stormtroopers')
      .send(fives)
      .expect(201)
      .end(function(err, response) {
        var body = response.body;
        assert.equal(body.nickname, 'Fives')
        assert.ok(body._id);
        done();
      });
  });
  it('PUT /stormtroopers/:_id', function(done) {
       this.timeout(5000);
    insert(function(err, result) {
      var _id = result._id;
      request(app)
        .put('/stormtroopers/' + _id)
        .send({ name: "CT-7567-77" })
        .end(function(err, response) {
          var body = response.body;
          //Não podemos comparar o obj abaixo pois com acesso nuvem a resposta é diferente
          //assert.deepEqual(body, { ok: true, n: 1, updatedExisting: true });
          assert.equal(body.ok, 1);
          assert.equal(body.n, 1);
          assert.equal(body.nModified, 1);
          done();
        });
    });
  });
  it('DELETE /stormtroopers/:_id', function(done) {
       this.timeout(5000);
    insert(function(err, result) {
      var _id = result._id;
      request(app)
        .delete('/stormtroopers/' + _id)
        .end(function(err, response) {
          var body = response.body;
          //Não podemos comparar o obj abaixo pois com acesso nuvem a resposta é diferente
          //assert.deepEqual(body, { n: 1 });
          assert.equal(body.ok, 1);
          assert.equal(body.n, 1);
          done();
        });
    });
  });
});//describe
