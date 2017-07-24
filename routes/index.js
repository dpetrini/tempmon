var express = require('express'),
    router = express.Router();

router.get('/', function (request, response) {
  response.status(201);
  response.json({ 'name': 'Daniel Petrini', 'email': 'd.pensator@gmail.com' });
});

// stormtroopers
router.use('/stormtroopers', require('./stormtroopers'));

// data_device_th
router.use('/device_data_th', require('./device_data_th'));

//overall check
router.use('/check', require('./check'));

module.exports = router;
