/*
  Mock do DB: simulates the methods of Mongo

  To check types compares with https://github.com/mafintosh/mongojs
*/

'use strict';
var debug   = require('debug')('tempmon:fixtures'),
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
      callback(null, {"temperature": "55"});
    },
    insert: function(data, callback) {
      if (data.node_id == "999") {  //send email case
        callback(null, { "node_id" : "999", time: 909000909090, log: "EmailSent" });
      } else {
        callback(null, {"_id": "5569c7fe17fa3690d24de049", "node_id": "333"});
      }
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
