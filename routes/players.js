var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/SS');


router.get('/', function(req, res) {
	var players = db.get('Players');
	players.find({}, function(err, players) {
		if(err) throw err;
		res.json( players);
	});
});

module.exports = router;