var express = require('express');
var Random = require('random-js');
var functions = require('../public/functions.js');
var router = express.Router();


router.get(/\/makeOneDraw/, function(req, res) {
	console.log(req.headers['authorization']);
	response = global.drawer.makeOneDraw(req.headers['authorization']);
	res.status(200).send("Draw completed successfully");
//	res.status(response.status).send(response.message);
});

router.get(/\/getDrawer/, function(req, res) {
	res.status(200).send(global.isDrawerActive);
});

router.get(/\/stopDrawer/, function(req, res) {
	clearInterval(global.drawer.startDrawer);
	global.isDrawerActive = false;
	res.status(200).send("Drawer stopped successfully");
});

router.get('/startDrawer/:drawDate', function(req, res) {
	global.drawer.startDrawer(req.params['drawDate']);
	res.status(200).send("Drawer Started Successfully");
});


module.exports = router;
