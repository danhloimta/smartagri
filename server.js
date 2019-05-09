require('dotenv').config();
var express = require('express');
var bodyParser = require('body-parser');
var ip = require('ip');
var path = require('path');
var cookieParser = require('cookie-parser');


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

    socket.on('disconnect', function () {
        console.log('Client disconnect'.gray);
    });
});
