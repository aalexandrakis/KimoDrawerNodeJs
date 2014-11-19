var express = require('express');
var Random = require('random-js');
var functions = require('../public/functions.js');
var router = express.Router();


router.get(/, function(req, res) {

	res.status(200).send("Drawer started successfully");
});

router.get('/stopService', function(req, res) {
	global.drawer.startDrawer(req.params['drawDate']);
	res.status(200).send("Drawer started successfully");
});

module.exports = router;
