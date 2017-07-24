/*
  Model
  Access layer for Mongo DB - using Mongojs
  Not in use in this project - here only for reference

*/

var debug   = require('debug')('tempmon:Model');

function Device_data_thModel(mongo) {
  this.mongo = mongo;
}
Device_data_thModel.prototype.find = function(query, callback) {
  this.mongo.collection('device_data_th').find(query, callback);
};
Device_data_thModel.prototype.findOne = function(_id, callback) {
  var query = { _id: this.mongo.ObjectId(_id) };
  this.mongo.collection('device_data_th').findOne(query, callback);
};
Device_data_thModel.prototype.create = function(data, callback) {
  debug(" insert data:" + data)
  this.mongo.collection('device_data_th').insert(data, callback);
};
Device_data_thModel.prototype.update = function(_id, data,callback) {
  var query = { _id: this.mongo.ObjectId(_id) };
  debug(" update:" + JSON.stringify(query));
  this.mongo.collection('device_data_th').update(query, data, callback);
};
Device_data_thModel.prototype.remove = function(_id, callback) {
  var query = { _id: this.mongo.ObjectId(_id) };
  this.mongo.collection('device_data_th').remove(query, callback);
};
module.exports = function(mongo) {
  return new Device_data_thModel(mongo);
}
