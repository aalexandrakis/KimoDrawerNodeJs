var express = require('express');
var Random = require('random-js');
var router = express.Router();
var Q = require('q');
var connection;

// create a Mersenne Twister-19937 that is auto-seeded based on time and other random values
var engine = Random.engines.mt19937().autoSeed();
// create a distribution that will consistently produce integers within inclusive range [0, 99].
var distribution = Random.integer(1, 80);
// generate a number that is guaranteed to be within [0, 99] without any particular bias.

router.get('/', function(req, res) {
    drawNumbers = [];
    //Create 20 random numbers
    function drawFunction(){
       result = [];
       df = new Q.defer();
       while (result.length != 20){
            console.log("setTimeOut ", result);
            setInterval(function(){
               number = distribution(engine);
               if (result.indexOf(number) == -1){
                  result.push(number);
               }
            } , 1);
            if (result.length == 20){
                 df.resolve(result);
            }
       }
       return df.promise;
   }

    Q().then(function(result){
            return drawFunction();
     }).then(function(result){
        clearInterval(getRandomNumber);
        res.status(200).send(result);
    }).catch(function(result){
        res.status(500).send(error);
    });
 });

module.exports = router;