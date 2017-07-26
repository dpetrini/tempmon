const	mongojs = require('mongojs'),
	config	= require('config'),
	debug 	= require('debug')('tempmon:db');

'use strict';
// "mongodb://Daniel:harmonia.900@cluster0-shard-00-00-muruw.mongodb.net:27017,cluster0-shard-00-01-muruw.mongodb.net:27017,cluster0-shard-00-02-muruw.mongodb.net:27017/MAIN?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin";


debug('NODE_ENV:' + process.env.NODE_ENV);

function _connection () {
	let temp = '';
	const username = config.get('mongo.username'),
		password = config.get('mongo.password'),
		server = config.get('mongo.server'),
		port = config.get('mongo.port'),
		database = config.get('mongo.database'),
		ssl = config.get('mongo.ssl'),
		auth = username ? username + ':' + password + '@' : '';

	debug(`Database: ${ database }`);

	temp = 'mongodb://' + auth + server + '' + port + '/' + database + ssl;

	debug(`Connection: ${ temp }`);

	return temp;
}
const db = mongojs(_connection());
db.on('error', function (err) {
	debug(err);
	console.log(err);
});
db.on('connect', function () {
	console.log('Mongo database connected');
});
module.exports = db;