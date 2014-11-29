var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var bodyParser = require('body-parser');
var connection  = require('express-myconnection');
var mysql = require('mysql');
var Drawer = require('./routes/drawer');

var signIn = require('./routes/signIn');
var signOut = require('./routes/signOut');
var testBets = require('./routes/testBets');
var tests = require('./routes/tests');
var drawerService = require('./routes/drawerService');
var lastDraw = require('./routes/lastDraw');
var getDrawInfo = require('./routes/getDrawInfo');

var app = express();

global.drawer = Drawer;
global.isDrawerActive = false;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cookieSession({secret: '9834306712alexik'}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(
    connection(mysql,{
        host: process.env.OPENSHIFT_MYSQL_DB_HOST || 'localhost',
        user: process.env.MYSQL_USERNAME,
        password : process.env.MYSQL_PASSWORD,
        port : process.env.OPENSHIFT_MYSQL_DB_PORT || 3306, //port mysql
        database:'kimodrawer'
    },'request')
);


console.log(OPENSHIFT_KIMODRAWER_IP);
console.log(OPENSHIFT_KIMODRAWER_PORT);
app.use(function (req, res, next) {
    //only for test req.url.indexOf('/startDrawer') != 0
    if (req.url != '/tests' && req.url != '/' && req.url != '/signOut' && req.url != '/signIn' && !req.session.user) {
        res.status(400).send("You do not have the authority to visit this page.");
  	} else {
         next();
  	}
});



app.use('/signIn', signIn);
app.use('/signOut', signOut);
app.use('/drawerService', drawerService);
app.use('/lastDraw', lastDraw);
app.use('/testBets', testBets);
app.use('/tests', tests);
app.use('/getDrawInfo', getDrawInfo);

app.get('/', function(req, res){
    res.sendFile(path.resolve() +"/public/partials/index.html");
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    res.send({
        message: err.message,
        error: err
    });
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
