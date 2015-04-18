var express = require('express');
var Random = require('random-js');
var functions = require('../public/functions.js');
var router = express.Router();


router.get(/\/getDrawer/, function(req, res) {
	res.status(200).send(global.isDrawerActive);
});

router.get(/\/stopDrawer/, function(req, res) {
	clearInterval(global.drawer.startDrawer);
	global.isDrawerActive = false;
	res.status(200).send("Drawer stopped successfully");
});

router.get('/makeOneDraw/:drawDate', function(req, res) {
	console.log(req.params.drawDate);
	response = global.drawer.makeOneDraw(req.params.drawDate);
	res.status(200).send("Draw completed successfully");
//	res.status(response.status).send(response.message);
});

router.get('/startDrawer/:drawDate/:diff', function(req, res) {
	console.log("test");
	global.drawer.startDrawer(req.params.drawDate, req.params.diff);
	res.status(200).send("Drawer Started Successfully");
});


module.exports = router;
