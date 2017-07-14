var debug = require('debug')('livro_nodejs:controller');


//Objeto escopo desta funcao foi passado pelo router e eh atribuido em this abaixo
function StormtrooperController(StormtrooperModel) {
  this.model = StormtrooperModel;
}

StormtrooperController.prototype.getAll = function(request, response, next) {
  this.model.find( {}, function(err, data) {
    if(err) {
      return next(err);
    }
    response.json(data);
  });
};
StormtrooperController.prototype.getById = function(request, response, next) {
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
StormtrooperController.prototype.create = function(request, response, next) {
  var body = request.body;
  debug(body);
  this.model.create(body, function(err, data) {
    if(err) {
      return next(err);
    }
    response.json(data);
  });
};
StormtrooperController.prototype.update = function(request, response, next) {
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
StormtrooperController.prototype.remove = function(request, response, next) {
  var _id = request.params._id;
  this.model.remove(_id, function(err, data) {
    if(err) {
      return next(err);
    }
    response.json(data);
  });
};
module.exports = function(StormtrooperModel) {
  return new StormtrooperController(StormtrooperModel);
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