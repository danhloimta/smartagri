var db = require('../db');

var allDb = db.get('notes').value();
var schedules = db.get('schedules').value();
var notesA = [],
    notesB = [],
    notesC = [];
var scheduleA = [],
    scheduleB = [],
    scheduleC = [];

allDb.forEach( function(element, index) {
    switch (element.kv) {
        case 'kvA':
            notesA.push(element);
            break;
        case 'kvB':
            notesB.push(element);
            break;
        case 'kvC':
            notesC.push(element);
            break;
        default:
            // statements_def
            break;
    }
});


schedules.forEach(function(ele, index) {
    switch (ele.kv) {
        case 'kvA':
            scheduleA.push(ele);
            break;
        case 'kvB':
            scheduleB.push(ele);
            break;
        case 'kvC':
            scheduleC.push(ele);
            break;
        default:
            // statements_def
            break;
    }
});

module.exports.kva = function(req, res) {
	res.render('index', {
		title: 'Area A',
		notes: notesA,
        schedules: scheduleA,
	});
};

module.exports.kvb = function(req, res) {
	res.render('index', {
		title: 'Area B',
		notes: notesB,
        schedules: scheduleB,
	});
};

module.exports.kvc = function(req, res) {
	res.render('index', {
		title: 'Area C',
		notes: notesC,
        schedules: scheduleC,
	});
};

module.exports.saveSchedule = function(req, res) {
    console.log(req.body);
    var schedule = {
        'kv': req.body.kv,
        'date': req.body.date,
        'time': req.body.time,
        'created_at': new Date()
    };
    db.get('schedules').push(schedule).write();
    res.redirect('back');
}