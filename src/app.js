import './sass/app.scss';
require('./bootstrap');

let socket = io();
let socketio = io.connect('http://localhost:3000');

$('.btn-schedule').click(function() {
	$('#schedule').submit();
});