var debug = require('debug')('tempmon:configAlertsController');
var transporter = require('../lib/sendmail');


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
    	let err = new Error('Not Found');
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
  debug(`Send Email: ${request.query.node_id} | ${request.query.email}`);
  sendEmail('Teste', request, function(err, data) {
    if(err) {
      return next(err);
    }
    response.json(data);
  });
};

module.exports = function(Device_config_alertsModel) {
  return new Device_config_alertsController(Device_config_alertsModel);
};

/*
  Envia email de acordo com endereco em response & action
*/
function sendEmail (action, request, callback) {

  if (!validateEmail(request.query.email)) {
        var err = new Error('Forbidden');
        err.status = 403;
        callback(error);  //Unprocessable Entity
  } 

  // setup email data with unicode symbols
  let mailOptions = {
      from: '"TempMon server 👻" <dp.domotica@gmail.com>', // sender address
      to: request.query.email, // list of receivers
      subject: action + ' email from tempmon server, node: ' + request.query.node_id, // Subject line
      text: 'Please confirm to tempmon administrator the reception of this message' // plain text body
      //html: '<b>Hello world ?</b>' // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          console.log(error);
          callback(error);
      }
      debug('Message %s sent: %s', info.messageId, info.response);
      callback (null, { node_id : request.query.node_id, result: 'OK' });
  });

}
/*
  Email address consistense
*/
function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}
//More complete:
//var EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;