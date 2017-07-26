var request = require('supertest'),
    assert  = require('assert'),
    debug   = require('debug')('tempmon:test'),
    app     = require('../../app'),
    mongo   = require('../../db/mongo');

var insert = function(callback) {
  var dummy = { node_id : "500", time: 1520852011496 };
  mongo.collection('device_config_alerts').insert(dummy, callback);
};
describe('Device Config Alerts (tempmon) Endpoints', function () {
  before(function(done) {
    //Needed for wait db connection
    this.timeout(10000);
    var device_config_alerts = [
          { node_id : "600", time : 2520852011496 },
          { condition: "lt10" },
          { node_id : "007", email: "d.penstor@gmail.com" }
        ];
    mongo.collection('device_config_alerts').insert(device_config_alerts, function(err, data) {
        if (err) {
          throw err;
        }
        debug("Describe.." + JSON.stringify(data));
        done();
    });
  });

  afterEach(function(done) {
    mongo.collection('device_config_alerts').remove({}, done);
  });
  it('GET /device_config_alerts | returns all devices', function(done) {
       this.timeout(5000);
    request(app)
      .get('/device_config_alerts')
      .end(function(err, response) {
        var body = response.body;
        assert.equal(body.length, 3);
        assert.equal(body[0].node_id, '600');
        assert.equal(body[2].email, "d.penstor@gmail.com");
        done();
      });
  });
  it('GET /device_config_alerts/:_id', function(done) {
       this.timeout(5000);
    insert(function(err, result) {
      var _id = result._id;
      request(app)
        .get('/device_config_alerts/' + _id)
        .end(function(err, response) {
          var body = response.body;
          delete body._id;
          assert.deepEqual(body, { node_id : "500", time: 1520852011496 });
          done();
        });
    });
  });
  it('GET /device_config_alerts/:_id not found', function(done) {
       this.timeout(5000);
    var _id = '55555aaaaa55555aaaaa4444';
    request(app)
      .get('/device_config_alerts/' + _id)
      .set('Accept', 'application/json')
      .expect(200)
      .end(function(err, response) {
        var body = response.body
        assert.equal(response.statusCode, 404);
        done();
      });
  });
  it('POST /device_config_alerts', function(done) {
       this.timeout(5000);
    var esp = { node_id : "800", time: 7720852011496 };
    request(app)
      .post('/device_config_alerts')
      .send(esp)
      .expect(201)
      .end(function(err, response) {
        var body = response.body;
        assert.equal(body.node_id, '800');
        assert.ok(body._id);
        done();
      });
  });

  // Email invalido
  it('GET /device_config_alerts/sensor?... - invalid email', function(done) {
    this.timeout(5000);
    var esp = { node_id : "350", email: "rrr%gmail.com" };;
    request(app)
      .get('/device_config_alerts/sensor')
      .send(esp)
      .expect(403)
      .end(function(err, response) {
        if (err) console.log(err); //console.log(response);
        var body = response.body;
        assert.equal(body.err, "Forbidden")
        done();
      });
  });

    // Email de teste
  it('GET /device_config_alerts/test ', function(done) {
    this.timeout(5000);
    var esp = { node_id : "350", email: "dpetrini2-compras@yahoo.com.br" };
    request(app)
      .get('/device_config_alerts/test')
      .query(esp)
      .expect(200)
      .end(function(err, response) {
        if (err) console.log(err); //console.log(JSON.stringify(response));
        var body = response.body;
        assert.equal(body.node_id, '350');
        assert.equal(body.result, 'OK');
        done();
      });
  });

  it('PUT /device_config_alerts/:_id', function(done) {
       this.timeout(5000);
    insert(function(err, result) {
      var _id = result._id;
      request(app)
        .put('/device_config_alerts/' + _id)
        .send({ node_id: "444" })
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
  it('DELETE /device_config_alerts/:_id', function(done) {
       this.timeout(5000);
    insert(function(err, result) {
      var _id = result._id;
      request(app)
        .delete('/device_config_alerts/' + _id)
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
