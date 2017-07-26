/** Device Config Alerts Controller
 *   Responds to Express Rourter for /device_config_alerts
 *   Configure email alerts for Tempmon app
 * @module Device_config_alertsController
 */
const debug = require('debug')('tempmon:configAlertsController');
const transporter = require('../lib/sendmail');


// Objeto escopo desta funcao foi passado pelo router e eh atribuido em this abaixo
function Device_config_alertsController (Device_config_alertsModel) {
	this.model = Device_config_alertsModel;
}

Device_config_alertsController.prototype.getAll = function (request, response, next) {
	this.model.find({}, (err, data) => {
		if (err) {
			return next(err);
		}
		response.json(data);
	});
};
Device_config_alertsController.prototype.getById = function (request, response, next) {
	const _id = request.params._id;
	this.model.findOne(_id, (err, data) => {
		if (err) {
			return next(err);
		}

		if (!data) {
			const err = new Error('Not Found');
			err.status = 404;
			return next(err);
		}
		response.json(data);
	});
};
Device_config_alertsController.prototype.create = function (request, response, next) {
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
Device_config_alertsController.prototype.createNew = function (req, response, next) {
	const timeNow = new Date();
	const time = timeNow.getTime();

// console.log(`${req.query.node_id} | ${req.query.field} | ${req.query.condition} | ${req.query.email}`);

// Basic consistence
	if (!validateEmail(req.query.email)) {
		const err = new Error('Forbidden');
		err.status = 403;
		return next(err);  // Unprocessable Entity
	}

	const deviceData = {
		node_id: req.query.node_id,
		time,
		field: req.query.field,
		condition: req.query.condition,
		email: req.query.email,
	};

	debug(deviceData);

	this.model.create(deviceData, (err, data) => {
		if (err) {
			return next(err);
		}
		response.json(data);
	});
};

Device_config_alertsController.prototype.update = function (request, response, next) {
	let _id = request.params._id;
	const body = request.body;
	this.model.update(_id, body, (err, data) => {
		if (err) {
			return next(err);
		}
		debug(` update response:${ JSON.stringify(data) }`);
		response.json(data);
	});
};
Device_config_alertsController.prototype.remove = function (request, response, next) {
	const _id = request.params._id;
	this.model.remove(_id, (err, data) => {
		if (err) {
			return next(err);
		}
		response.json(data);
	});
};

Device_config_alertsController.prototype.sendTestEmail = function (request, response, next) {
	debug(`Send Email: ${ request.query.node_id } | ${ request.query.email }`);
	sendEmail('Teste', request, (err, data) => {
		if (err) {
			return next(err);
		}
		response.json(data);
	});
};

module.exports = function (Device_config_alertsModel) {
	return new Device_config_alertsController(Device_config_alertsModel);
};


/**
 * Implements email sending for controllers
 * @param {String} action - The reason why we send an email, eg. test, alert, etc
 * @param {Obj} request - Request parameter from Express
 * @param {function} callback - Callback
 * @returns {None} - By callback
 */
function sendEmail (action, request, callback) {
	if (!validateEmail(request.query.email)) {
		const err = new Error('Forbidden');
		err.status = 403;
		callback(err);  // Unprocessable Entity
	}

  // setup email data with unicode symbols
	const mailOptions = {
		from: '"TempMon server 👻" <dp.domotica@gmail.com>', // sender address
		to: request.query.email, // list of receivers
		subject: `${ action } email from tempmon server, node: ${ request.query.node_id }`, // Subject line
		text: 'Please confirm to tempmon administrator the reception of this message', // plain text body
	};

  // send mail with defined transport object
	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.log(error);
			callback(error);
		}
		debug('Message %s sent: %s', info.messageId, info.response);
		callback(null, {
			node_id: request.query.node_id,
			result: 'OK',
		});
	});
}

/**
 * Implements email format validation
 * @param {String} email - Email to be validated
 * @returns {Boolean} - `true` if fine, `false` if nor properly email address template
 */
function validateEmail (email) {
	const re = /\S+@\S+\.\S+/;
	return re.test(email);
}
// More complete:
// var EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
