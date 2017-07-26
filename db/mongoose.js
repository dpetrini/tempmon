/* Not in use  */

var mongoose = require('mongoose'),
    config  = require('config'),
    debug   = require('debug')('tempmon:db');

//"mongodb://Daniel:harmonia.900@cluster0-shard-00-00-muruw.mongodb.net:27017,cluster0-shard-00-01-muruw.mongodb.net:27017,cluster0-shard-00-02-muruw.mongodb.net:27017/MAIN?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin";

'use strict';

mongoose.Promise = Promise;

console.log("NODE_ENV:" + process.env.NODE_ENV  );

function _connection() {
  var username  = config.get('mongo.username'),
    password    = config.get('mongo.password'),
    server      = config.get('mongo.server'),
    port        = config.get('mongo.port'),
    database    = config.get('mongo.database'),
    ssl         = config.get('mongo.ssl'),
    auth        = username ? username + ':' + password + '@' : '';

    debug(`Database: ${database}`);

  return 'mongodb://' + auth + server + '' + port + '/' + database + ssl;
}

mongoose.connect(_connection(), { useMongoClient: true });

var db = mongoose.connection;
db.on('error', function(err) {
  debug(err);
  console.log(err);
});
db.once('open', function (callback) {
 console.log('Mongo database connected');
});

module.exports = mongoose;