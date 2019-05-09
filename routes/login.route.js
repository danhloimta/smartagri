var express = require('express');
var router = express.Router();
var db = require('../db');
var controller = require('../controllers/login.controller');

router.get('/login', controller.login);
router.post('/login', controller.Postlogin);
router.get('/logout', controller.logout);

module.exports = router;