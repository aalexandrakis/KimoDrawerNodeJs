#!/usr/bin/env node
var debug = require('debug')('KimoDrawerNodeJs');
var app = require('../app');
var startDrawer = require('../startDrawer');

app.set('port', process.env.PORT || 3005);

var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
//      i = 1;
//      interval = setInterval(function(){
//          console.log("interval ", i);
//          i++;
//      }, 1000);
  startDrawer.getUsers(app);
});
