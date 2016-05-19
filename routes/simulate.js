
var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/SS');


router.get('/:id1/:id2', function(req, res) {
	var teams = db.get('Teams');
	teams.findOne({_id : req.params.id1}, function(err, team) {
		if(err) throw err;
		var team1 = team;
		teams.findOne({_id : req.params.id2}, function(err, team) {
			if(err) throw err;
			var team2 = team;
			res.json(simulate(team1,team2));
			
		});
		
	});
});

module.exports = router;

//Soccer spirits simulation
function simulate(team1,team2) {
	var time = 0;
	var spirit1 = 1;
	var spirit2 = 1;
	var ball;
	if(Math.random() >= 0.5) {
		ball = cml1;
	}
	else {
		ball = cml2;
	}
	
	
	
	
	
	var results = {};
	results.wins = 100;
	results.losses = 22;
	return results;

}