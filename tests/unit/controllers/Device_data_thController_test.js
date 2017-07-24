var fixtures                = require('../../fixtures'),
    Device_data_thModel       = require('../../../models/Device_data_thModel')(fixtures.mongo),
    Device_data_thController  = require('../../../controllers/Device_data_thController')(Device_data_thModel),
    assert                  = require('assert'),
    debug                   = require('debug')('tempmon:test');

var request = fixtures.request;
var response = fixtures.response;
request.params._id = '5569c7fe17fa3690d24de049';

describe('Device_data_thController', function () {
  it('#create', function(done) {
    request.body.name = 'Rex';
    response.json = function(obj) {
      assert.deepEqual(obj, {_id: '5569c7fe17fa3690d24de049', node_id: '333'});
      done();
    };
    Device_data_thController.create(request, response, fixtures.next);
  });
  it('#getAll', function(done) {
    response.json = function(obj) {
      debug(obj);
      assert.deepEqual(obj, [{ "node_id" : "600"}, {"node_id" : "200"}]);
      done();
    };
    Device_data_thController.getAll(request, response, fixtures.next);
  });
  it('#getById', function(done) {
    response.json = function(obj) {
      assert.deepEqual(obj, {temperature: "55"});
      done();
    };
    Device_data_thController.getById(request, response, fixtures.next);
  });
  it('#update', function(done) {
    response.json = function(obj) {
      assert.deepEqual(obj, {ok: 1, nModified: 1, n: 1 });
      done();
    };
    Device_data_thController.update(request, response, fixtures.next);
  });
  it('#delete', function(done) {
    response.json = function(obj) {
      assert.deepEqual(obj, {ok: 1, n: 1});
      done();
    };
    Device_data_thController.remove(request, response, fixtures.next);
  });
});//describe
