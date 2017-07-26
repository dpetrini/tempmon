/*
  Model
  Access layer for Mongo DB - using Mongojs
  Not in use in this project - here only for reference

*/

var debug   = require('debug')('tempmon:deviceConfigAlertsModel');

function Device_config_alertsModel(mongo) {
  this.mongo = mongo;
}
Device_config_alertsModel.prototype.find = function(query, callback) {
  this.mongo.collection('device_config_alerts').find(query, callback);
};
Device_config_alertsModel.prototype.findOne = function(_id, callback) {
  var query = { _id: this.mongo.ObjectId(_id) };
  this.mongo.collection('device_config_alerts').findOne(query, callback);
};
Device_config_alertsModel.prototype.create = function(data, callback) {
  debug("Insert data:" + data);
  this.mongo.collection('device_config_alerts').insert(data, callback);
};
Device_config_alertsModel.prototype.update = function(_id, data,callback) {
  var query = { _id: this.mongo.ObjectId(_id) };
  debug(" update:" + JSON.stringify(query));
  this.mongo.collection('device_config_alerts').update(query, data, callback);
};
Device_config_alertsModel.prototype.remove = function(_id, callback) {
  var query = { _id: this.mongo.ObjectId(_id) };
  this.mongo.collection('device_config_alerts').remove(query, callback);
};
module.exports = function(mongo) {
  return new Device_config_alertsModel(mongo);
};