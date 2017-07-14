var mongojs = require('mongojs'),
    config  = require('config'),
    debug   = require('debug')('livro_nodejs:db');

//"mongodb://Daniel:harmonia.900@cluster0-shard-00-00-muruw.mongodb.net:27017,cluster0-shard-00-01-muruw.mongodb.net:27017,cluster0-shard-00-02-muruw.mongodb.net:27017/MAIN?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin";

'use strict';

function _connection() {
  var username  = config.get('mongo.username'),
    password    = config.get('mongo.password'),
    server      = config.get('mongo.server'),
    port        = config.get('mongo.port'),
    database    = config.get('mongo.database'),
    auth        = username ? username + ':' + password + '@' : '';

    debug(database.substring(0,10));
  return 'mongodb://' + auth + server + '' + port + '/' + database;
}
var db = mongojs(_connection());
db.on('error', function(err) {
  debug(err);
  console.log(err);
});
db.on('connect', function () {
 console.log('Mongo database connected')
});
module.exports = db;