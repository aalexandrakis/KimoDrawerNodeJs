var express = require('express');
var Random = require('random-js');
var functions = require('../public/functions.js');
var Q = require('q');
var router = express.Router();

// create a Mersenne Twister-19937 that is auto-seeded based on time and other random values
var engine = Random.engines.mt19937().autoSeed();
// create a distribution that will consistently produce integers within inclusive range [0, 99].
var distribution = Random.integer(1, 80);
var multiplier = Random.integer(1, 20);
var repeatedDraws = Random.integer(1, 12);
// generate a number that is guaranteed to be within [0, 99] without any particular bias.


/* GET login. */
router.get('/', function(req, res) {
	numbers = "6, 8, 10, 12, 17, 18, 24, 31, 33, 34, 44, 56";
	drawNumbers = [6, 8, 9, 10, 11, 12, 18 ,23 ,24 ,25, 32, 46, 51, 54, 60, 67, 71, 73, 76, 79];
	   matches = 0;
	   numbers.split(",").forEach(function(number, indexNumbers){
		   if (matches == null){
				matches = 0;
		   }
		   if(drawNumbers.indexOf(+number) > -1){
			   matches++;
		   }
	   });
	   res.send("Matches " + matches);
});

router.get('/getApp', function(req, res) {
//	   res.send("users from req" + req.getUsers);
	   res.send("users from app" + global.users);
});


module.exports = router;
