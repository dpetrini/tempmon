/*
    Arquivo de rotas para configuracao de envio de alertas por email
    ex.
    http://127.0.0.1:3000/device_config_alerts/sensor?node_id=200&email=dai@yahoo.com.br&field=temperatura&condition=gt50

*/

var express = require('express'),
    router = express.Router();

var mongo = require('../db/mongo');
var Device_config_alertsModel = require('../models/Device_config_alertsModel')(mongo); //Objeto passado em this ai dentro..? (propria conexao do db)
var Device_config_alertsController = require('../controllers/Device_config_alertsController')(Device_config_alertsModel); //idem, e sim. Vide exports da origem.
var passport = require('passport');

//Binds abaixo para que mantenham o escopo original e nao o escopo de agora (da invocacao)
//router.get('/', passport.authenticate('basic', { session: false }), StormtrooperController.getAll.bind(StormtrooperController));
//router.get('/:_id', passport.authenticate('basic', { session: false }), StormtrooperController.getById.bind(StormtrooperController));
router.get('/', Device_config_alertsController.getAll.bind(Device_config_alertsController));
router.get('/sensor', Device_config_alertsController.createNew.bind(Device_config_alertsController));
router.get('/test', Device_config_alertsController.sendTestEmail.bind(Device_config_alertsController));
router.get('/:_id', Device_config_alertsController.getById.bind(Device_config_alertsController));
router.post('/', Device_config_alertsController.create.bind(Device_config_alertsController));
router.put('/:_id', Device_config_alertsController.update.bind(Device_config_alertsController));
router.delete('/:_id', Device_config_alertsController.remove.bind(Device_config_alertsController));


module.exports = router;