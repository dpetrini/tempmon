/*
  Model
  Access layer for Mongo DB - using Mongojs
  Not in use in this project - here only for reference

*/

var debug   = require('debug')('livro_nodejs:Model');

function StormtrooperModel(mongo) {
  this.mongo = mongo;
}
StormtrooperModel.prototype.find = function(query, callback) {
  this.mongo.collection('stormtroopers').find(query, callback);
};
StormtrooperModel.prototype.findOne = function(_id, callback) {
  var query = { _id: this.mongo.ObjectId(_id) };
  this.mongo.collection('stormtroopers').findOne(query, callback);
};
StormtrooperModel.prototype.create = function(data, callback) {
  debug(" insert data:" + data)
  this.mongo.collection('stormtroopers').insert(data, callback);
};
StormtrooperModel.prototype.update = function(_id, data,callback) {
  var query = { _id: this.mongo.ObjectId(_id) };
  debug(" update:" + JSON.stringify(query));
  this.mongo.collection('stormtroopers').update(query, data, callback);
};
StormtrooperModel.prototype.remove = function(_id, callback) {
  var query = { _id: this.mongo.ObjectId(_id) };
  this.mongo.collection('stormtroopers').remove(query, callback);
};
module.exports = function(mongo) {
  return new StormtrooperModel(mongo);
}
