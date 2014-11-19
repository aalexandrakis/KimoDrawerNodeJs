var express = require('express');
var Random = require('random-js');
var functions = require('../public/functions.js');
var router = express.Router();

/* GET login. */
router.get('/:drawDate', function(req, res) {
//	global.drawer.startDrawer("201120142200");
	global.drawer.startDrawer(req.params['drawDate']);
	res.send("ok");
//res.send(global.startDrawer);
});

module.exports = router;
