/*
  Model
  Access layer for Mongo DB - using Mongoose

  Table Device_data_th

*/

var debug   = require('debug')('livro_nodejs:Model');

'use strict';
function Device_data_thDAO(model) {
  this.model = model;
}
Device_data_thDAO.prototype.create = function(data, callback) {
  var model = new this.model(data);
    model.save(function(err, result) {
      console.log("3"+JSON.stringify(result));
    callback(err, result);
  });
};
Device_data_thDAO.prototype.find = function(query, callback) {
  this.model.find(query).exec(callback);
};
Device_data_thDAO.prototype.findOne = function(_id, callback) {
  var query = { _id : _id };
  this.model.findOne(query).exec(callback);
};
Device_data_thDAO.prototype.update = function(_id, data, callback) {
  var query = { _id : _id };
  this.model.update(query, data).exec(function(err, result) {
    callback(err, result);
  });
};
Device_data_thDAO.prototype.remove = function(_id, callback) {
  var query = { _id : _id };
  this.model.remove(query).exec(function(err, result) {
    callback(err, result);
  });
};

/*
module.exports = function(mongoose) {
  var Device_data_th = mongoose.model('Device_data_th', {
    node_id:      Number,
    time:         Number,
    temperature:  String,
    humidity:     String,
    state:        String
  });
  return new Device_data_thDAO(Device_data_th);
};
*/

var mongooseModelNew = function(mongoose) {

  return new Device_data_thDAO(mongooseModel((mongoose)));
};

var Device_data_th;

var mongooseModel = function (mongoose) {
  Device_data_th = mongoose.model('Device_data_th', {
    node_id:      Number,
    time:         Number,
    temperature:  String,
    humidity:     String,
    state:        String
  });
  return Device_data_th;
}

module.exports = {
  mongooseModelNew: mongooseModelNew,
  mongooseModel: mongooseModel,
  Device_data_th: Device_data_th
}
