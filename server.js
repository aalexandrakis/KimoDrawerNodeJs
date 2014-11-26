#!/usr/bin/env node
var debug = require('debug')('kimodrawer');
var app = require('./app');

app.set('port', process.env.OPENSHIFT_NODEJS_PORT || 3005);

var server = app.listen(app.get('port'), function() {
//  debug('Express server listening on port ' + server.address().port);
});