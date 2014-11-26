var express = require('express');
var router = express.Router();
/* POST login. */
router.post('/', function(req, res) {
	req.getConnection(function(err,connection){
		query = "SELECT * from admins where adminEmail = '" + req.body.adminEmail + "' and adminPass = '" + req.body.adminPass + "'";
		connection.query(query ,function(err,userRow)     {
			if(err) {
				res.send({"status":"DB-ERROR", "message":"Error Selecting : %s " + err });
			} else if(userRow.length == 0){
				res.send({message: "Email or password error. Please try again", status: "900"});
			} else {
				req.session.user = userRow[0];
				res.send(userRow[0]);
			}
		});
	});
});


module.exports = router;
