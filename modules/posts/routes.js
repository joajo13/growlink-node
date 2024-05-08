const router = require('express').Router();
const { isLogged } = require('../middlewares/auth');
const cPosts = require('./controller');
const mwAuth = require('../middlewares/auth').isLogged;

router.get('/getAll', isLogged, cPosts.getAllPosts);

module.exports = router;