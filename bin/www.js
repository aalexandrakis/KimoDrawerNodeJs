#!/usr/bin/env node
var debug = require('debug')('kimodrawer');
var app = require('./app');

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 3005
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'


var server = app.listen(server_port, server_ip_address, function() {
  debug('Express server listening on port ' + server.address().port);
});
