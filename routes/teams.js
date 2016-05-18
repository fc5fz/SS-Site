var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/SS');




router.get('/', function(req, res) {
	
	var sess = req.cookies['connect.sid'];
    var collection = db.get('Teams');
	var users = db.get('users');
	users.findOne( {'local.session' : sess}, function(err, user) {
		if(err) throw err;
		var username = user.local.username;
		collection.find({'user' : username}, function(err, teams){
			if (err) {
				throw err;
			}
			res.json(teams);
		});
	});
	
   
	
});




router.get('/:id', function(req, res) {
    var collection = db.get('Teams');
    collection.findOne({ _id: req.params.id }, function(err, team){
        if (err) throw err;

      	res.json(team);
    });
});

router.delete('/:id', function(req, res) {
    var collection = db.get('Teams');
	var sess = req.cookies['connect.sid'];
	var users = db.get('users');
	users.findOne( {'local.session' : sess}, function(err, user) {
		if(err) throw err;
		var username = user.local.username;
		collection.findOne( {'user' :username, '_id':req.params.id}, function(err,team) {
			if(team) {
				collection.remove( { _id: req.params.id }, function(err, team) {
					if(err) throw err;
					res.json(team);
				});
			}
		});
	});
	
});



router.put('/:id', function(req, res){
    var collection = db.get('Teams');
	var sess = req.cookies['connect.sid'];
	var users = db.get('users');
	users.findOne( {'local.session' : sess}, function(err, user) {
		if(err) throw err;
		var username = user.local.username;
		collection.findOne( {'user' : username, '_id' : req.params.id }, function(err, team) {
			if(team) {
				collection.update({
				_id: req.params.id
				},
				{
					name: req.body.name,
					lwf: req.body.lwf,
					stcl: req.body.stcl,
					stcr: req.body.stcr,
					rwf: req.body.rwf,
					cl: req.body.cl,
					cml : req.body.cml,
					cmr : req.body.cmr,
					cr : req.body.cr,
					dl : req.body.dl,
					cbl : req.body.cbl,
					cbr : req.body.cbr,
					dr : req.body.dr,
					gk : req.body.gk,
					user : username
				}, function(err, video){
					if (err) throw err;

					res.json(video);
				});
			
			}
		
		});
		
		
	});
	
   
});

router.post('/', function(req, res){
    var collection = db.get('Teams');
	var sess = req.cookies['connect.sid'];
	var users = db.get('users');
	users.findOne( {'local.session' : sess}, function(err, user) {
		if(err) throw err;
		var username = user.local.username;

		
		collection.insert({
			name: req.body.name,
			lwf: req.body.lwf,
			stcl: req.body.stcl,
			stcr: req.body.stcr,
			rwf: req.body.rwf,
			cl: req.body.cl,
			cml : req.body.cml,
			cmr : req.body.cmr,
			cr : req.body.cr,
			dl : req.body.dl,
			cbl : req.body.cbl,
			cbr : req.body.cbr,
			dr : req.body.dr,
			gk : req.body.gk,
			user : username
		}, function(err, video){
			if (err) throw err;
			res.json(video);
		});
	});
});
module.exports = router;