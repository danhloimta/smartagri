var db = require('../db');
var express = require('express');

module.exports.login = function(req, res) {
	res.render('login');
};

module.exports.Postlogin = function(req, res) {
	username = req.body.username;
	password = req.body.password;

	var user = db.get('users').find({ username: username }).value();

	if(!user) {
		res.render('login', {
			errors: [
				'Tài khoản hoặc mật khẩu không đúng!'
			],
			value: req.body
		});
		return;
	}

	if(user.password !== password) {
		res.render('login', {
			errors: [
				'Tài khoản hoặc mật khẩu không đúng!'
			],
			value: req.body
		});
		return;
	}

	res.cookie('token', user.username);
	res.redirect('/');
};

module.exports.logout = function(req, res) {
	// console.log(req.cookies.token);
	// res.cookie('token', 'logout', {overwrite: true});
	res.clearCookie('token', { path: 'http://localhost:3000/auth', overwrite: true});
	// res.cookie('token2', 'logout');
	res.redirect('auth/login');
};