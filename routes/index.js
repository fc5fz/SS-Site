/*var express = require('express');
var router = express.Router();
*/
/* GET home page. */

module.exports = function(app) {
app.get('/',isLoggedIn, function(req, res, next) {
	console.log(req.user.local.username);
	res.render('myTeams.jade', { title: 'Soccer Spirits Simulator', user: req.user.local.username});
});

};
// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/home');
}