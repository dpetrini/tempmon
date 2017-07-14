var express = require('express'),
    router = express.Router();

//var mongo = require('../db/mongo');
var mongoose = require('../db/mongoose');
var Device_data_thModel = require('../models/Device_data_thModel').mongooseModelNew(mongoose); //Objeto passado em this ai dentro..? (propria conexao do db)
var Device_data_thController = require('../controllers/Device_data_thController')(Device_data_thModel); //idem, e sim. Vide exports da origem.
var passport = require('passport');

//Binds abaixo para que mantenham o escopo original e nao o escopo de agora (da invocacao)
//router.get('/', passport.authenticate('basic', { session: false }), StormtrooperController.getAll.bind(StormtrooperController));
//router.get('/:_id', passport.authenticate('basic', { session: false }), StormtrooperController.getById.bind(StormtrooperController));
router.get('/', Device_data_thController.getAll.bind(Device_data_thController));
router.get('/sensor', Device_data_thController.createNew.bind(Device_data_thController));
router.get('/:_id', Device_data_thController.getById.bind(Device_data_thController));
router.post('/', Device_data_thController.create.bind(Device_data_thController));
router.put('/:_id', Device_data_thController.update.bind(Device_data_thController));
router.delete('/:_id', Device_data_thController.remove.bind(Device_data_thController));

module.exports = router;


/*
var express = require('express'),
    router = express.Router();

var StormtrooperController = require('../controllers/StormtrooperController');

router.get('/', StormtrooperController.getAll);
router.get('/:_id', StormtrooperController.getById);
router.post('/', StormtrooperController.create);
router.put('/:_id', StormtrooperController.update);
router.delete('/:_id', StormtrooperController.remove);

module.exports = router;*/
