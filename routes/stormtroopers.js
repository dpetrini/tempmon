var express = require('express'),
    router = express.Router();

//var mongo = require('../db/mongo');
var mongoose = require('../db/mongoose');
var StormtrooperModel = require('../models/StormtrooperModel')(mongoose); //Objeto passado em this ai dentro..? (propria conexao do db)
var StormtrooperController = require('../controllers/StormtrooperController')(StormtrooperModel); //idem, e sim. Vide exports da origem.
var passport = require('passport');

//Binds abaixo para que mantenham o escopo original e nao o escopo de agora (da invocacao)
//router.get('/', passport.authenticate('basic', { session: false }), StormtrooperController.getAll.bind(StormtrooperController));
//router.get('/:_id', passport.authenticate('basic', { session: false }), StormtrooperController.getById.bind(StormtrooperController));
router.get('/', StormtrooperController.getAll.bind(StormtrooperController));
router.get('/:_id', StormtrooperController.getById.bind(StormtrooperController));
router.post('/', StormtrooperController.create.bind(StormtrooperController));
router.put('/:_id', StormtrooperController.update.bind(StormtrooperController));
router.delete('/:_id', StormtrooperController.remove.bind(StormtrooperController));

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
