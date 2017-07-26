const express = require('express'),
	router = express.Router();

router.get('/', function (request, response) {
	response.status(201);
	response.json({
		name: 'Daniel Petrini',
		email: 'd.pensator@gmail.com',
	});
});

// data_device_th
router.use('/device_data_th', require('./device_data_th'));

// device_config_alerts
router.use('/device_config_alerts', require('./device_config_alerts'));

// Overall check
router.use('/check', require('./check'));

module.exports = router;
