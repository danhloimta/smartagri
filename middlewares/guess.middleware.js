module.exports.guess = function (req, res, next) {
	if (req.cookies.token) {
		res.redirect('/');
	}
	next();
}