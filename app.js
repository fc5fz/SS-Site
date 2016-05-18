var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');

var passport = require('passport');
var routes = require('./routes/index');
var teams = require('./routes/teams');
var loginRoutes = require('./routes/login');
var jwt = require('jwt-simple');
var app = express();
var port = process.env.PORT || 8080;
var flash  = require('connect-flash');
var session      = require('express-session');

var configDB = require('./config/database.js');

mongoose.connect(configDB.url);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(passport.initialize());

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', routes);
app.use('/api/teams', teams);

app.use(session({ secret: 'testsecret', resave: false, saveUninitialized: true })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash());
require('./config/passport')(passport); // pass passport for configuration
require('./routes/login.js')(app,passport);
require('./routes/index.js')(app);


	
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.listen(port);
module.exports = app;