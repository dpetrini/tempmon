/*
  Mock do DB: simulates the methods of Mongo

  To check types compares with https://github.com/mafintosh/mongojs
*/

'use strict';
var debug   = require('debug')('tempmon:fixtures.alerts'),
    assert  = require('assert');

function _model() {}

var fixtures = {
  mongoose: {

    model: function(name, schema) {
      return _model;
    }

  },
  mongo: {
    collection: function(name) {
      return fixtures.mongo;
    },
    ObjectId: function() {
      return {};
    },
    find: function(query, callback) {
      callback(null, [{ "node_id" : "600"}, {"node_id" : "200"} ]);
    },
    findOne: function(query, callback) {
      callback(null, {"field": "humidity"});
    },
    insert: function(data, callback) {
      callback(null, {"_id": "5569c7fe17fa3690d24de049", 
                      "node_id": "333", 
                      "time": 300222002020, 
                      "field": "temperature", 
                      "condition": "lt10", 
                      "email": "d.penstor@gmail.com" });
    },
    update: function(query, data, callback) {
      callback(null, {"ok": 1, "nModified": 1, "n": 1 });
    },
    remove: function(query, callback) {
      callback(null, {"ok": 1, "n": 1 });
    }
  },
  next: function(err) {
    debug('catch err', err);
    assert.deepEqual(err, {});
  },
  request: {
    body: {},
    params: {},
    query: {}
  },
  response: {
    status: function(code) {
      return {
        json: function json(obj) {
          debug('not mocked', obj);
        }
      };
    },
    json: function(obj) {
      debug('not mocked', obj);
    }
  }
};
module.exports = fixtures;
