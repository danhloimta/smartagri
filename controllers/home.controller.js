var db = require('../db');

var allDb = db.get('notes').value();
var notesA = [],
    notesB = [],
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

module.exports.kva = function(req, res) {
	res.render('index', {
		title: 'Area A',
		notes: notesA
	});
};

module.exports.kvb = function(req, res) {
	res.render('index', {
		title: 'Area B',
		notes: notesB
	});
};

module.exports.kvc = function(req, res) {
	res.render('index', {
		title: 'Area C',
		notes: notesC
	});
};