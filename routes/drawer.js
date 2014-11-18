var express = require('express');
var Random = require('random-js');
var router = express.Router();
var Q = require('q');


// create a Mersenne Twister-19937 that is auto-seeded based on time and other random values
var engine = Random.engines.mt19937().autoSeed();
// create a distribution that will consistently produce integers within inclusive range [0, 99].
var distribution = Random.integer(1, 80);
// generate a number that is guaranteed to be within [0, 99] without any particular bias.

router.get('/', function(req, res) {

    function errorFunction(err){
        error = new Error();
        error.status = 500;
        error.message = err;
        return error;
    }
    //get next draw
    function getNextDraw(){
        df = new Q.defer();
        req.getConnection(function(err,connection){
            if(err){
                df.reject(errorFunction(err));
            } else {
                query = "SELECT nextDraw FROM next_draw ";
                connection.query(query ,function(err,nextDraw)     {
                    if(err){
                        df.reject(errorFunction(err));
                    } else {
                        df.resolve(nextDraw[0].nextDraw);
                    }
                });
            }
        });
        return df.promise;
    }

    //save next draw + 5 minutes
    function saveNextDraw(currentDraw){
        df = new Q.defer();
        req.getConnection(function(err,connection){
            if(err){
                df.reject(errorFunction(err));
            } else {
                nextDraw = new Date(currentDraw.getTime() + (5 * 60000));
                nextDrawString = nextDraw.getFullYear().toString() + "-" +
                                 (nextDraw.getMonth() + 1 < 10 ? ("0" + nextDraw.getMonth() + 1) : (nextDraw.getMonth() + 1)).toString() + "-"+
                                 (nextDraw.getDate() < 10 ? "0" + nextDraw.getDate() : nextDraw.getDate()).toString() + " " +
                                 (nextDraw.getHours() < 10 ? "0" + nextDraw.getHours() : nextDraw.getHours()).toString() + ":" +
                                 (nextDraw.getMinutes() < 10 ? "0" + nextDraw.getMinutes() : nextDraw.getMinutes()).toString() + ":" +
                                 (nextDraw.getSeconds() < 10 ? "0" + nextDraw.getSeconds() : nextDraw.getSeconds()).toString();

                query = "UPDATE next_draw set nextDraw = '" + nextDrawString + "'";
                connection.query(query, function(err,nextDrawRow)     {
                    if(err){
                        df.reject(errorFunction(err));
                    } else {
                        df.resolve({'currentDraw':currentDraw, 'nextDraw':nextDraw});
                    }
                });
            }
        });
        return df.promise;
    }
    //Create 20 random numbers
    function drawFunction(input){
       numbers = [];
       df = new Q.defer();
       while (numbers.length != 20){
               number = distribution(engine);
               if (numbers.indexOf(number) == -1){
                  numbers.push(number);
               }
            if (numbers.length == 20){
                 numbers = numbers.sort(function(a,b){
                    return a - b;
                 });
                 result = {};
                 result.drawDateTime = new Date();
                 result.drawNumbers = numbers;
                 df.resolve(result);
            }
       }
       return df.promise;
   }

    Q().then(function(result){
            return getNextDraw();
     }).then(function(result){
            return saveNextDraw(result);
     }).then(function(result){
            return drawFunction();
     }).then(function(result){
        res.status(200).send(result);
    }).catch(function(result){
        res.status(500).send(error);
    });
 });

module.exports = router;