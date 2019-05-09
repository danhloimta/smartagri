var db = require('../db');

module.exports.requireAuth = function (req, res, next) {
	if (!req.cookies.token) {
		res.redirect('/auth/login');
		return;
	}

	var user = db.get('users').find({ username: req.cookies.token }).value();
	if (!user) {
		res.redirect('/auth/login');
		return;
	}
	res.locals.user = user;
	next();
}