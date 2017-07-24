var fixtures                = require('../../fixtures.alerts'),
    Device_config_alertsModel       = require('../../../models/Device_config_alertsModel')(fixtures.mongo),
    Device_config_alertsController  = require('../../../controllers/Device_config_alertsController')(Device_config_alertsModel),
    assert                  = require('assert'),
    debug                   = require('debug')('tempmon:test');

var request = fixtures.request;
var response = fixtures.response;
request.params._id = '5569c7fe17fa3690d24de049';

describe('Device_config_alertsController', function () {
  it('#create', function(done) {
    request.body.name = 'kkk';
    response.json = function(obj) {
      assert.deepEqual(obj, {"_id": "5569c7fe17fa3690d24de049", 
                      "node_id": "333", 
                      "time": 300222002020, 
                      "field": "temperature", 
                      "condition": "lt10", 
                      "email": "d.penstor@gmail.com" });
      done();
    };
    Device_config_alertsController.create(request, response, fixtures.next);
  });
  it('#getAll', function(done) {
    response.json = function(obj) {
      debug(obj);
      assert.deepEqual(obj, [{ "node_id" : "600"}, {"node_id" : "200"}]);
      done();
    };
    Device_config_alertsController.getAll(request, response, fixtures.next);
  });
  it('#getById', function(done) {
    response.json = function(obj) {
      assert.deepEqual(obj, { field: "humidity" });
      done();
    };
    Device_config_alertsController.getById(request, response, fixtures.next);
  });
  it('#update', function(done) {
    response.json = function(obj) {
      assert.deepEqual(obj, {ok: 1, nModified: 1, n: 1 });
      done();
    };
    Device_config_alertsController.update(request, response, fixtures.next);
  });
  it('#delete', function(done) {
    response.json = function(obj) {
      assert.deepEqual(obj, {ok: 1, n: 1});
      done();
    };
    Device_config_alertsController.remove(request, response, fixtures.next);
  });
});//describe
