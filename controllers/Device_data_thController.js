var debug = require('debug')('tempmon:controller');


//Objeto escopo desta funcao foi passado pelo router e eh atribuido em this abaixo
function Device_data_thController(Device_data_thModel) {
  this.model = Device_data_thModel;
}

Device_data_thController.prototype.getAll = function(request, response, next) {
  this.model.find( {}, function(err, data) {
    if(err) {
      return next(err);
    }
    response.json(data);
  });
};
Device_data_thController.prototype.getById = function(request, response, next) {
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
Device_data_thController.prototype.create = function(request, response, next) {
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
Device_data_thController.prototype.createNew = function(req, response, next) {
let timeNow = new Date();
let time = timeNow.getTime();

//console.log(`${req.query.node_id} | ${req.query.temp} | ${req.query.humd} | ${time}`);

//Basic consistence
if (((req.query.temp > 100) || (req.query.temp <= -40)) ||
    ((req.query.humd >= 100) || (req.query.humd < 0))) {
      var err = new Error('Out of the limits Value');
      err.status = 422;
      return next (err);  //Unprocessable Entity
}

  let deviceData =
    {
      "node_id":      req.query.node_id,
      "time":         time,
      "temperature":  req.query.temp,
      "humidity":     req.query.humd,
      "state":        "Op/Ok"
    };

  debug(deviceData);

  this.model.create(deviceData, function(err, data) {
    if(err) {
      return next(err);
    }
    response.json(data);
  });
};

Device_data_thController.prototype.update = function(request, response, next) {
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
Device_data_thController.prototype.remove = function(request, response, next) {
  var _id = request.params._id;
  this.model.remove(_id, function(err, data) {
    if(err) {
      return next(err);
    }
    response.json(data);
  });
};
module.exports = function(Device_data_thModel) {
  return new Device_data_thController(Device_data_thModel);
};


/*
function StormtrooperController() {}

StormtrooperController.prototype.getAll = function(request, response, next) {
  response.send('get all stormtroopers');
};
StormtrooperController.prototype.getById = function(request, response, next) {
  response.send('get a specific stormtrooper by id');
};
StormtrooperController.prototype.create = function(request, response, next) {
  response.send('create a new stormtroopers');
};
StormtrooperController.prototype.update = function(request, response, next) {
  response.send('update a stormtrooper');
};
StormtrooperController.prototype.remove = function(request, response, next) {
  response.send('remove a stormtrooper');
};
module.exports = new StormtrooperController();
*/
