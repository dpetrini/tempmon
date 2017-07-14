/*
 Aplicação completa com 
 -Debug
 -Express


 (referencia em: https://github.com/wbruno/livro-nodejs)

*/

var debug = require('debug')('app.js');
var express = require('express');
var methodOverride  = require('method-override');
var bodyParser      = require('body-parser');
var passport        = require('passport');
var BasicStrategy   = require('passport-http').BasicStrategy;
var app = express();

// server config
app.use(methodOverride('X­HTTP­Method'));
app.use(methodOverride('X­HTTP­Method­Override'));
app.use(methodOverride('X­Method­Override'));
app.use(methodOverride('_method'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Basic HTTP Auth Middleware
app.use(passport.initialize());
passport.use(
  new BasicStrategy(function(username, password, done) {
    if (username.valueOf() === 'rebels' && password.valueOf() === '1138') {
      return done(null, true);
    } else {
      return done(null, false);
    }
  })
);

// router
app.use('/', require('./routes'));

// error handling
app.use(function(request, response, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, request, response, next) {
  response.status(err.status || 500).json({ err: err.message });
});

// server listener
module.exports = app;