var fixtures          = require('../../fixtures.alerts'),
    Device_config_alerts = require('../../../models/Device_config_alertsModel')(fixtures.mongo),
    assert            = require('assert'),
    debug             = require('debug')('tempmon:test');

describe('Device_config_alerts Model - Unit Tests', function () {
  it('#insert', function(done) {
    Device_config_alerts.create({node_id: "333"}, function(err, result) {
      assert.deepEqual(result, {"_id": "5569c7fe17fa3690d24de049", 
                                "node_id": "333", 
                                "time": 300222002020, 
                                "field": "temperature", 
                                "condition": "lt10", 
                                "email": "d.penstor@gmail.com" });
      done();
    });
  });
  it('#find', function(done) {
    Device_config_alerts.find({}, function(err, result) {
      assert.equal(result.length, 2);
      done();
    });
  });
  it('#findOne', function(done) {
    Device_config_alerts.findOne({field: "humidity"}, function(err, result) {
      assert.equal(result.field, 'humidity');
      done();
    });
  });
  it('#update', function(done) {
    Device_config_alerts.update({ node_id : "600" }, { email: 'ddd@gmail.com' }, function(err, result) {
      debug(result);
      assert.deepEqual(result, {"ok": 1, "nModified": 1, "n": 1});
      done();
    });
  });
  it('#remove', function(done) {
    Device_config_alerts.remove({node_id : "300"}, function(err, result) {
      assert.deepEqual(result, {"ok": 1, "n": 1});
      done();
    });
  });
});//describe
