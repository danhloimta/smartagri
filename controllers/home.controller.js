var db = require('../db');

var allDb = db.get('notes').value();
var schedules = db.get('schedules').value();

var notesA = [],
    notesB = [],
    notesC = [];
var scheduleA = [],
    scheduleB = [],
    scheduleC = [];

function getNotes() {
    notesA = [];
    notesB = [];
    notesC = [];

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
}

function getSchedules() {
    scheduleA = [],
    scheduleB = [],
    scheduleC = [];

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
}

getSchedules();
getNotes();

module.exports.kva = function(req, res) {
    getNotes();
    getSchedules();
	res.render('index', {
		title: 'Area A',
		notes: notesA,
        schedules: scheduleA,
	});
};

module.exports.kvb = function(req, res) {
    getNotes();
    getSchedules();
	res.render('index', {
		title: 'Area B',
		notes: notesB,
        schedules: scheduleB,
	});
};

module.exports.kvc = function(req, res) {
    getNotes();
    getSchedules();
    res.render('index', {
		title: 'Area C',
		notes: notesC,
        schedules: scheduleC,
	});
};

module.exports.saveSchedule = function(req, res) {
    var schedule = {
        'kv': req.body.kv,
        'date': req.body.date,
        'time': req.body.time,
        'created_at': new Date()
    };
    var area = [];

    switch (req.body.kv) {
        case 'kvA':
            area.push(scheduleA);
            break;
        case 'kvB':
            area.push(scheduleB);
            break;
        case 'kvC':
            area.push(scheduleC);
            break;
        default:
            break;
    }

    if (area.length > 0 && area[0].length > 0) {
        db.get('schedules').find({ kv: req.body.kv }).assign(schedule).write();
        res.redirect('back');

        return;
    }

    db.get('schedules').push(schedule).write();
    res.redirect('back');
}