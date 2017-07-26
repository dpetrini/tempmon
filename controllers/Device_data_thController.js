/** Device Data th (temperature/ Humidity) Controller
 *   Responds to Express Rourter for /device_data_th
 *   Receives data from sensors (devices) and send to models (database). Tempmon app
 * @module Device_data_thController
 */
const debug = require('debug')('tempmon:controller');


// Objeto escopo desta funcao foi passado pelo router e eh atribuido em this abaixo
function Device_data_thController (Device_data_thModel) {
	this.model = Device_data_thModel;
}

Device_data_thController.prototype.getAll = function (request, response, next) {
	this.model.find({}, (err, data) => {
		if (err) {
			return next(err);
		}
		response.json(data);
	});
};
Device_data_thController.prototype.getById = function (request, response, next) {
	const _id = request.params._id;
	this.model.findOne(_id, (err, data) => {
		if (err) {
			return next(err);
		}
		if (!data) {
			err = new Error('Not Found');
			err.status = 404;
			return next(err);
		}
		response.json(data);
	});
};
Device_data_thController.prototype.create = function (request, response, next) {
	const body = request.body;
	debug(body);
	this.model.create(body, (err, data) => {
		if (err) {
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
Device_data_thController.prototype.createNew = function (req, response, next) {
	const timeNow = new Date();
	const time = timeNow.getTime();

// console.log(`${req.query.node_id} | ${req.query.temp} | ${req.query.humd} | ${time}`);

// Basic consistence
	if (req.query.temp > 100 || req.query.temp <= -40
		|| (req.query.humd >= 100 || req.query.humd < 0)) {
		const err = new Error('Out of the limits Value');
		err.status = 422;
		return next(err);  // Unprocessable Entity
	}

	const deviceData
	= {
		node_id: req.query.node_id,
		time,
		temperature: req.query.temp,
		humidity: req.query.humd,
		state: 'Op/Ok',
	};

	debug(deviceData);

	// check if some limit conditions met with this incoming sample
	if (checkSensorConditions(req)) {
		if (sendEmail()) {
			console.log('An email was sent');
		} else {
			console.log('An email should be sent but wasn´t');
		}
	} else {
		// Do nothing
	}

	this.model.create(deviceData, (err, data) => {
		if (err) {
			return next(err);
		}
		response.json(data);
	});
};

Device_data_thController.prototype.update = function (request, response, next) {
	const _id = request.params._id;
	const body = request.body;
	this.model.update(_id, body, (err, data) => {
		if (err) {
			return next(err);
		}
		debug(` update response:${ JSON.stringify(data) }`);
		response.json(data);
	});
};
Device_data_thController.prototype.remove = function (request, response, next) {
	const _id = request.params._id;
	this.model.remove(_id, (err, data) => {
		if (err) {
			return next(err);
		}
		response.json(data);
	});
};

module.exports = function (Device_data_thModel) {
	return new Device_data_thController(Device_data_thModel);
};

/*
 TODO
 -Read alerts db searching for current node_id
 -if finds, compare with current sample
 -How to read other model's database inside this controller?

*/
function checkSensorConditions (request) {
	return false;
}

function sendEmail (/* action, request, callback */) {
	return true;
}

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
