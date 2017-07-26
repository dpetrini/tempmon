var debug = require('debug')('tempmon:configAlertsController');


//Objeto escopo desta funcao foi passado pelo router e eh atribuido em this abaixo
function Device_config_alertsController(Device_config_alertsModel) {
  this.model = Device_config_alertsModel;
}

Device_config_alertsController.prototype.getAll = function(request, response, next) {
  this.model.find( {}, function(err, data) {
    if(err) {
      return next(err);
    }
    response.json(data);
  });
};
Device_config_alertsController.prototype.getById = function(request, response, next) {
  var _id = request.params._id;
  this.model.findOne(_id, function(err, data) {
    if(err) {
      return next(err);
    }
    if(!data){
    	var err = new Error('Not Found');
    	err.status = 404;
    	return next (err);
    }
    response.json(data);
  });
};
Device_config_alertsController.prototype.create = function(request, response, next) {
  var body = request.body;
  debug(body);
  this.model.create(body, function(err, data) {
    if(err) {
      return next(err);
    }
    response.json(data);
  });
};
/*
Creates based in GET with parameters
Validates user (machine) input

Get URL example: /sensor?node_id=100&temp=27&humd=80&state="Op/Ok"
*/
Device_config_alertsController.prototype.createNew = function(req, response, next) {
let timeNow = new Date();
let time = timeNow.getTime();

//console.log(`${req.query.node_id} | ${req.query.field} | ${req.query.condition} | ${req.query.email}`);

//Basic consistence

if (!validateEmail(req.query.email)) {
      var err = new Error('Forbidden');
      err.status = 403;
      return next (err);  //Unprocessable Entity
}  

  let deviceData = {
      "node_id":      req.query.node_id,
      "time":         time,
      "field":        req.query.field,
      "condition":    req.query.condition,
      "email":        req.query.email
    };

  debug(deviceData);

  this.model.create(deviceData, function(err, data) {
    if(err) {
      return next(err);
    }
    response.json(data);
  });
};

Device_config_alertsController.prototype.update = function(request, response, next) {
  var _id = request.params._id,
      body = request.body;
  this.model.update(_id, body, function(err, data) {
    if(err) {
      return next(err);
    }
    debug(" update response:" + JSON.stringify(data));
    response.json(data);
  });
};
Device_config_alertsController.prototype.remove = function(request, response, next) {
  var _id = request.params._id;
  this.model.remove(_id, function(err, data) {
    if(err) {
      return next(err);
    }
    response.json(data);
  });
};

Device_config_alertsController.prototype.sendTestEmail = function(request, response, next) {
  var email = request.body.email;

  sendEmail('test', request, function(err, data) {
    if(err) {
      return next(err);
    }
    response.json(data);
  });

};

module.exports = function(Device_config_alertsModel) {
  return new Device_config_alertsController(Device_config_alertsModel);
};

function sendEmail (action, request, callback) {

  //request.query.email
    return callback (null, { node_id : request.body.node_id, result: 'OK' });
}

function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}
//More complete:
//var EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;  
