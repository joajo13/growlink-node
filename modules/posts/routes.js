const router = require('express').Router();
const { isLogged } = require('../middlewares/controller');
const cPosts = require('./controller');

router.get('/getAll', cPosts.getPublicFeedPosts);

module.exports = router;