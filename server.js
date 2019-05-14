require('dotenv').config();
var express = require('express');
var bodyParser = require('body-parser');
var ip = require('ip');
var path = require('path');
var cookieParser = require('cookie-parser');
var db = require('./db');


var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var colors = require('colors');
var port = process.env.PORT || 3000;

server.listen(port, function () {
    console.log("Server nodejs chay tai dia chi: " + ip.address() + ":" + port)
});

var indexRouter = require('./routes/index.route');
var loginRouter = require('./routes/login.route.js');

var guessMiddleware = require('./middlewares/guess.middleware.js');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/auth', guessMiddleware.guess, loginRouter);

io.on('connection', function (socket) {
    console.log('New client connect'.gray);

    socket.on('led-kitchen', function(data) {
        console.log('led kitchen ' + data);
        socket.broadcast.emit('led-kitchen', data);
    });

    socket.on('sent-note', function(data) {
        var mess = {};
        mess.kv = data.kv;
        mess.content = data.content;
        mess.user = data.user;
        mess.created_at = getFormattedDate();
        
        db.get('notes').unshift(mess).write();
        io.sockets.emit('show-mess', mess);
    });


    socket.on('send_info', function(data) {
    	console.log(data);

        setInterval(handleData, 10000, data);
    	socket.broadcast.emit('show-info', data);
    });

    socket.on('save_info', function(data) {
        // handleData(data);
    });

    socket.on('click_mbom', function(data) {
    	console.log(data);
    	socket.broadcast.emit('mbom', data);
    });

    socket.on('res', function(data) {
    	console.log(data);
    	socket.broadcast.emit('mbom-res', data);
    });

    socket.on('disconnect', function () {
        console.log('Client disconnect'.gray);
    });
});

function getFormattedDate() {
    var date = new Date();
    var str = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +  date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

    return str;
}

function getMinute() {
    var date = new Date();

    Date.prototype.addMinutes = function(minutes) {
        this.setMinutes(this.getMinutes() + minutes);
        return this;
    };

    var minute = {};

    minute.now = date.getMinutes();
    minute.after = date.addMinutes(5).getMinutes();

    return minute;
}

function saveData(data) {
	setTimeout(hanleData, 60000, data);
}

function handleData(data) {
    console.log('save data: ', data.random);
    // db.get('doam').push(data.random).write();
}