const router = require('express').Router();
const cAuth = require('./controller');

router.post('/login', cAuth.login);
router.post('/signup', cAuth.signUp);

module.exports = router;