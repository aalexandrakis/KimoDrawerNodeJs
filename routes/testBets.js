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

var crypto = require('crypto')
  , password = crypto.createHash('sha1');
    password.update(process.env.KIMO_DRAWER_PASSWORD);
var authorization = new Buffer(process.env.KIMO_DRAWER_USERNAME + ":" + password.digest('hex')).toString('base64');

/* GET login. */
router.get('/:betsToCreate', function(req, res) {
	bets = [];
	for (i=0;i<req.params['betsToCreate'];i++){
		bets.push(createBet(createRandomList()));
		if (i+1 == req.params['betsToCreate']){
			status = saveBet(bets);
			console.log("status " + status);
			res.status(status).send(status==200?"Bets created successfully":"An error occurred");
		}
	}

	//create random number list
	function createRandomList(){
		numbers = [];
		while (numbers.length != 12){
			  number = distribution(engine);
			  if (numbers.indexOf(number) == -1){
				numbers.push(number);
			  }
			  if (numbers.length == 12){
				return numbers.sort(function(a,b){
				   return a - b;
				});
			  }
		 }
	}

	function createBet(numbers){
		 result = {};
		 result.betDateTime = new Date();
		 result.betNumber1 = numbers[0];
		 result.betNumber2 = numbers[1];
		 result.betNumber3 = numbers[2];
		 result.betNumber4 = numbers[3];
		 result.betNumber5 = numbers[4];
		 result.betNumber6 = numbers[5];
		 result.betNumber7 = numbers[6];
		 result.betNumber8 = numbers[7];
		 result.betNumber9 = numbers[8];
		 result.betNumber10 = numbers[9];
		 result.betNumber11 = numbers[10];
		 result.betNumber12 = numbers[11];
		 result.gameType = 12;
		 result.multiplier = multiplier(engine);
		 result.repeatedDraws = repeatedDraws(engine);
		 result.drawTimeStamp = null;
		 result.betCoins = result.multiplier * result.repeatedDraws * 0.5;
		 result.userId = 10;
		 return result;
	}

	function saveBet(bets){
		var response="";
		functions.httpPost("PUT", authorization, '/drawer/saveBets', JSON.stringify({bets: bets}),
		function(data){
			response += data;
		},
		function(end){
			return 200;
		},
		function(error){
			console.log(error);
			return 500;
		});
		return 200;
	}
});


module.exports = router;
