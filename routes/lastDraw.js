var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	req.getConnection(function(err,connection){
		query = "SELECT * from draw order by drawDateTime DESC limit 1";
		connection.query(query ,function(err,row)     {
			if(err) {
				res.status(500).send(err);
			} else{
				res.status(500).send(row);
			}
		});
	});
});


module.exports = router;
