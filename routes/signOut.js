var express = require('express');
var router = express.Router();
/* POST logout. */
router.post('/', function(req, res){
	req.session = {};
	res.send({"status":"OK"});
});

module.exports = router;
