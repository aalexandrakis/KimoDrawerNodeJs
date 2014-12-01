var Random = require('random-js');
var functions = require('../functions');

// create a Mersenne Twister-19937 that is auto-seeded based on time and other random values
var engine = Random.engines.mt19937().autoSeed();
// create a distribution that will consistently produce integers within inclusive range [0, 99].
var distribution = Random.integer(1, 80);
var multiplier = Random.integer(1, 20);
var repeatedDraws = Random.integer(1, 12);
var gameTypeRandom = Random.integer(3, 12);
// generate a number that is guaranteed to be within [0, 99] without any particular bias.

var crypto = require('crypto')
  , password = crypto.createHash('sha1');
    password.update(process.env.KIMO_DRAWER_PASSWORD);
var authorization = new Buffer(process.env.KIMO_DRAWER_USERNAME + ":" + password.digest('hex')).toString('base64');

/* GET login. */
	setInterval(function(){
		createBet(createRandomList());
	}, 60000);

	//create random number list
	function createRandomList(){
		numbers = [];
		gameType = gameTypeRandom(engine);
		while (numbers.length != 12){

			  number = distribution(engine);
			  if (numbers.length < gameType){
				  if (numbers.indexOf(number) == -1){
					numbers.push(number);
				  }
			  } else {
			  	  numbers.push(0);
			  }
			  if (numbers.length == 12){
			  	console.log("numbers:", numbers);
				return numbers.sort(function(a,b){
				   return a - b;
				});
			  }
		 }
	}

	function createBet(numbers, gameType){
		 result = {};
		 result.betDateTime = functions.convertDateToMySqlTimeStampString(new Date());
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
		 result.gameType = gameType;
		 result.multiplier = multiplier(engine);
		 result.repeatedDraws = repeatedDraws(engine);
		 result.drawTimeStamp = "";
		 result.betCoins = result.multiplier * result.repeatedDraws * 0.5;
		 result.userId = 10;
		 results=[];
		 results.push(result);
		 saveBet(results);
	}

	function saveBet(bets){
		var response="";
		functions.httpPostOnline("PUT", authorization, '/drawer/saveBets', JSON.stringify({bets: bets}),
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
