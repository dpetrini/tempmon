var fixtures          = require('../../fixtures'),
    Device_data_th = require('../../../models/Device_data_thModel')(fixtures.mongo),
    assert            = require('assert'),
    debug             = require('debug')('tempmon:test');

describe('Device_data_th', function () {
  it('#insert', function(done) {
    Device_data_th.create({node_id: "333"}, function(err, result) {
      assert.deepEqual(result, {_id: '5569c7fe17fa3690d24de049', node_id: "333"});
      done();
    });
  });
  it('#find', function(done) {
    Device_data_th.find({}, function(err, result) {
      assert.equal(result.length, 2);
      done();
    });
  });
  it('#findOne', function(done) {
    Device_data_th.findOne({temperature: "55"}, function(err, result) {
      assert.equal(result.temperature, '55');
      done();
    });
  });
  it('#update', function(done) {
    Device_data_th.update({ node_id : "600" }, { temperature: '44' }, function(err, result) {
      debug(result);
      assert.deepEqual(result, {"ok": 1, "nModified": 1, "n": 1});
      done();
    });
  });
  it('#remove', function(done) {
    Device_data_th.remove({node_id : "300"}, function(err, result) {
      assert.deepEqual(result, {"ok": 1, "n": 1});
      done();
    });
  });
});//describe
