var express = require('express');
var router = express.Router();
var middleware = require('../middlewares/auth.middleware.js');

router.get('/', function(req, res, next) {
	res.redirect('/area/kvA');
});

var controller = require('../controllers/home.controller.js');

router.get('/area/kvA', middleware.requireAuth, controller.kva);
router.get('/area/kvB', middleware.requireAuth, controller.kvb);
router.get('/area/kvC', middleware.requireAuth, controller.kvc);

router.post('/area/*', middleware.requireAuth, controller.saveSchedule);

module.exports = router;