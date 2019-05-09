import './sass/app.scss';
require('./bootstrap');
require('iot-timer.min.js');

let socket = io();
let socketio = io.connect('http://localhost:3000');
