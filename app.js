var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var bodyParser = require('body-parser');
var connection  = require('express-myconnection');
var mysql = require('mysql');

var signIn = require('./routes/signIn');
var signOut = require('./routes/signOut');
var drawer = require('./routes/drawer');
var testBets = require('./routes/testBets');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cookieSession({secret: '9834306712alexik'}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(

    connection(mysql,{

        host: 'localhost',
        user: 'kimo',
        password : 'kimo',
        port : 3306, //port mysql
        database:'kimo'
    },'request')
);

app.use(function (req, res, next) {
    if (req.url != '/signOut' && req.url != '/signIn' && !req.session.user) {
        res.sendFile(path.resolve() +"/public/partials/index.html");
  	} else {
         next();
  	}
});



app.use('/signIn', signIn);
app.use('/signOut', signOut);
app.use('/drawer', drawer);
app.use('/testBets', testBets);

app.get('/', function(req, res){
    res.sendFile(path.resolve() +"/public/partials/index.html");
});

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
        res.send({
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send({
        message: err.message,
        error: {}
    });
});


module.exports = app;
