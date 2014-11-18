var express = require('express');
var Random = require('random-js');
var functions = require('../public/functions.js');
var router = express.Router();
var Q = require('q');


// create a Mersenne Twister-19937 that is auto-seeded based on time and other random values
var engine = Random.engines.mt19937().autoSeed();
// create a distribution that will consistently produce integers within inclusive range [0, 99].
var distribution = Random.integer(1, 80);
// generate a number that is guaranteed to be within [0, 99] without any particular bias.

router.post('/', function(req, res) {

    function errorFunction(err){
        error = new Error();
        error.status = 500;
        error.message = "=======================" + err;
        return error;
    }
    //get next draw
    function getNextDraw(){
        console.log("========= getting next draw");
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

        currentDraw = new Date(functions.fromEuroToIsoWithDelimiters(currentDraw));
//        console.log("bbbbb " + currentDraw);
        df = new Q.defer();
        req.getConnection(function(err,connection){
            if(err){
                df.reject(errorFunction(err));
            } else {
                nextDraw = new Date(currentDraw.getTime() + (5 * 60000));
                nextDrawString = functions.convertDateToMySqlTimeStampString(nextDraw);

                query = "UPDATE next_draw set nextDraw = '" + nextDrawString + "'";
                connection.query(query, function(err,nextDrawRow)     {
                    if(err){
                        df.reject(errorFunction(err));
                    } else {
                        console.log("========= next draw at " + nextDrawString);
                        df.resolve({'currentDraw':currentDraw, 'nextDraw':nextDraw});
                    }
                });
            }
        });
        return df.promise;
    }
    //Create and save new draw
    function newDraw(input){
       console.log("========= create draw ");
       numbers = [];
       df = new Q.defer();
       req.getConnection(function(err,connection){
           if(err){
              df.reject(errorFunction(err));
           } else {
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
                    result.drawNumber1 = numbers[0];
                    result.drawNumber2 = numbers[1];
                    result.drawNumber3 = numbers[2];
                    result.drawNumber4 = numbers[3];
                    result.drawNumber5 = numbers[4];
                    result.drawNumber6 = numbers[5];
                    result.drawNumber7 = numbers[6];
                    result.drawNumber8 = numbers[7];
                    result.drawNumber9 = numbers[8];
                    result.drawNumber10 = numbers[9];
                    result.drawNumber11 = numbers[10];
                    result.drawNumber12 = numbers[11];
                    result.drawNumber13 = numbers[12];
                    result.drawNumber14 = numbers[13];
                    result.drawNumber15 = numbers[14];
                    result.drawNumber16 = numbers[15];
                    result.drawNumber17 = numbers[16];
                    result.drawNumber18 = numbers[17];
                    result.drawNumber19 = numbers[18];
                    result.drawNumber20 = numbers[19];
                    query = "INSERT into draw set ?";
                    connection.query(query, result, function(err, newDrawResult)     {
                          if(err){
                              df.reject(errorFunction(err));
                          } else {
                              result.drawNumbers = numbers;
                              df.resolve(result);
                          }
                    });
                  }
             }
           }
       });
       return df.promise;
   }

   //retrieve bets
   function retrieveActiveBets(input){
       console.log("========= retrieving active bets ");
       numbers = [];
       df = new Q.defer();
       req.getConnection(function(err,connection){
           if(err){
              df.reject(errorFunction(err));
           } else {
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
                    result.drawNumber1 = numbers[0];
                    result.drawNumber2 = numbers[1];
                    result.drawNumber3 = numbers[2];
                    result.drawNumber4 = numbers[3];
                    result.drawNumber5 = numbers[4];
                    result.drawNumber6 = numbers[5];
                    result.drawNumber7 = numbers[6];
                    result.drawNumber8 = numbers[7];
                    result.drawNumber9 = numbers[8];
                    result.drawNumber10 = numbers[9];
                    result.drawNumber11 = numbers[10];
                    result.drawNumber12 = numbers[11];
                    result.drawNumber13 = numbers[12];
                    result.drawNumber14 = numbers[13];
                    result.drawNumber15 = numbers[14];
                    result.drawNumber16 = numbers[15];
                    result.drawNumber17 = numbers[16];
                    result.drawNumber18 = numbers[17];
                    result.drawNumber19 = numbers[18];
                    result.drawNumber20 = numbers[19];
                    query = "select * ," +
                    "CONCAT(betNumber1 , \", \" , betNumber2 , \", \" , betNumber3 , \", \" , betNumber4 , \", \" , betNumber5 , \", \" , betNumber6 , \", \" , " +
                    " betNumber7 , \", \" , betNumber8 , \", \" , betNumber9 , \", \" , betNumber10 , \", \" , betNumber11 , \", \" , betNumber12) as betNumbers" +
                    " from active_bets where betDateTime < '" + functions.convertDateToMySqlTimeStampString(input.drawDateTime) + "'";
                    connection.query(query, function(err, bets)     {
                          if(err){
                              df.reject(errorFunction(err));
                          } else {
                              input.bets = bets;
                              df.resolve(input);
                          }
                    });
                  }
             }
           }
       });
       return df.promise;
   }

    //checkBets
    function checkBets(input){
          console.log("========= checking bets");
          df = new Q.defer();
          drawNumbers = input.drawNumbers;
          if (input.bets.length == 0){
            df.resolve(input);
          }
          input.bets.forEach(function(bet, index){
               matches = 0;
               bet.betNumbers.split("/").forEach(function(number){
                   if(drawNumbers.indexOf(number) > -1){
                       matches++;
                   }
               })
               bet.matches = matches;
               bet.draws++;
               req.getConnection(function(err,connection){
                   if(err){
                      df.reject(errorFunction(err));
                   } else {
                      query = "select returnRate from rates where gameType = " + bet.gameType + " and matches = " + bet.matches;
                      connection.query(query, result, function(err, returnRate)     {
                             if(err){
                                 df.reject(errorFunction(err));
                             } else {
                                 if(returnRate.length > 0){
                                   bet.returnRate = returnRate[0].returnRate;
                                 } else {
                                   bet.returnRate = 0;
                                 }
                                 delete bet.betNumbers;
                                 if (index+1 == input.bets.length){
                                     df.resolve(input);
                                 }
                             }
                       });
                   }
               });

          });
          return df.promise;
    }

    function updateBets(input){
        df = new Q.defer()
        bets = input.bets;
        req.getConnection(function(err,connection){
            if(err)
                console.error("Process stopped due to an error in inserting bets to archive table");
             bets.forEach(function(bet, index){
                delete bet.id;
                bet.drawTimeStamp = input.drawDateTime;
                query="insert into bets_archive set ?";
                connection.query(query, bet, function(err, insertResult)     {
                    if(err)
                        console.log("Could not insert betId " + bet.betId + " " + err);
                        if (bet.repeatedDraws == bet.draws){
                            console.log("on delete ", bet.betId);
                            query="delete from active_bets where betId = " + bet.betId;
                            connection.query(query, function(err, insertResult)     {
                                if(err)
                                    console.log("Could not delete betId " + bet.betId + " " + err);
                                    if(index + 1 == bets.length) {
                                            console.log("resolved");
                                           df.resolve(input);
                                    }
                            });
                        } else {
                            query="update active_bets set ? where betId = " + bet.betId;
                            connection.query(query, bet, function(err, insertResult)     {
                                if(err)
                                    console.log("Could not update betId " + bet.betId + " " + err);
                                    if(index + 1 == bets.length) {
                                            console.log("resolved");
                                           df.resolve("ok");
                                    }
                            });
                        }
                });

            });
        });
        return df.promise;
    }

//    Q().then(function(result){
//            return getNextDraw();
     Q().then(function(result){
            return saveNextDraw(req.body.drawDate);
     }).then(function(result){
            return newDraw(result);
     }).then(function(result){
            return retrieveActiveBets(result);
     }).then(function(result){
            console.log("========= " + result.bets.length + " bets retrieved");
            return checkBets(result);
     }).then(function(result){
            return updateBets(result);
     }).then(function(result){
         console.log("========= bets updated");
        res.status(200).send(result);
    }).catch(function(result){
        res.status(500).send(error);
    });
 });

module.exports = router;