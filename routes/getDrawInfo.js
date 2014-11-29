var express = require('express');
var functions = require('../public/functions');
var router = express.Router();
/* POST login. */
router.get('/:date', function(req, res) {
	req.getConnection(function(err,connection){
		dateFrom = functions.fromEuroToIsoWithDelimiters(req.params['date'] + '0000')+ ":00";
		dateTo = functions.fromEuroToIsoWithDelimiters(req.params['date'] + '235959')+ ":59";
		query = "SELECT * from draw_info where drawDateTime between  '" + dateFrom + "' and '" + dateTo + "'";
		connection.query(query ,function(err,drawInfoRow)     {
			if(err) {
				res.status(500).send(err);
			} else {
				res.status(200).send(drawInfoRow);
			}
		});
	});
});


module.exports = router;
