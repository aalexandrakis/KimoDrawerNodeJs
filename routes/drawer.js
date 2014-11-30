var express = require('express');
var Random = require('random-js');
var functions = require('../public/functions.js');
var router = express.Router();
var Q = require('q');
var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : process.env.OPENSHIFT_MYSQL_DB_HOST,
  user     : process.env.MYSQL_USERNAME,
  password : process.env.MYSQL_PASSWORD,
  port : process.env.OPENSHIFT_MYSQL_DB_PORT, //port mysql
  database:'kimodrawer'
});

var crypto = require('crypto')
  , password = crypto.createHash('sha1');
    password.update(process.env.KIMO_DRAWER_PASSWORD);
var authorization = new Buffer(process.env.KIMO_DRAWER_USERNAME + ":" + password.digest('hex')).toString('base64');

// create a Mersenne Twister-19937 that is auto-seeded based on time and other random values
var engine = Random.engines.mt19937().autoSeed();
// create a distribution that will consistently produce integers within inclusive range [0, 99].
var distribution = Random.integer(1, 80);
// generate a number that is guaranteed to be within [0, 99] without any particular bias.

exports.drawTimer = false;

exports.globalNextDraw = null;

exports.startDrawer = function(drawDate, diff){
        globalNextDraw = functions.addDelimitersToIsoDate(drawDate);
        global.isDrawerActive = true;
        console.log("Draw starts in ", ((diff / 1000) / 60));
        timeout = setTimeout(function(){
            console.log("drawerFired");
            makeDraw(globalNextDraw);

            drawTimer = setInterval(function(){
                makeDraw(globalNextDraw);
            }, 300000);

            clearTimeout(timeout);
        }, diff);

        return {"status":200, "message":"Draw completed successfully successfully"};

}

exports.makeOneDraw = function(drawDate){

         Q().then(function(result){
                return newDraw(functions.addDelimitersToIsoDate(drawDate));
         }).then(function(result){
                return retrieveActiveBets(result);
         }).then(function(result){
                console.log("========= " + result.bets.length + " bets retrieved");
                return checkBets(result);
         }).then(function(result){
                return updateBets(result);
         }).then(function(result){
                return storeDrawInfo(result);
         }).then(function(result){
             console.log(result);
             return {"status":200, "message":"Draw completed successfully successfully"};
        }).catch(function(error){
            console.log("========= error ", error);
            return {"status":500, "message":"Draw not completed successfully successfully"};
        });
}



function makeDraw (drawDate){
     console.log("in the drawer");
     Q().then(function(){
            return newDraw(drawDate);
     }).then(function(result){
            return saveNextDrawDate(result);
     }).then(function(result){
            return retrieveActiveBets(result);
     }).then(function(result){
            console.log("========= " + result.bets.length + " bets retrieved");
            return checkBets(result);
     }).then(function(result){
            return updateBets(result);
     }).then(function(result){
            return storeDrawInfo(result);
    }).then(function(result){
         console.log(result);
    }).catch(function(error){
        console.log("========= error ", error);
    });
}


    function errorFunction(err){
        error = new Error();
        error.status = 500;
        error.message = "=======================" + err;
        return error;
    }

    //Create and save new draw
    function newDraw(drawDate){
       console.log("========= create draw ");
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
            result.drawDateTime = drawDate;
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

            var response="";
            functions.httpPost("POST", authorization, '/drawer/saveDraw', JSON.stringify(result),
            function(data){
                response += data;
            },
            function(end){
              result.drawNumbers = numbers;
              result.drawInfo = {};
              result.drawInfo.drawDateTime = result.drawDateTime;
              df.resolve(result);
            },
            function(error){
                df.reject(error);
            });

          }
       }
       return df.promise;
   }

    //save next draw + 5 minutes
    function saveNextDrawDate(input){
        df = new Q.defer();
        currentDraw = input.drawDateTime;
        currentDraw = new Date(currentDraw.substring(0,4), currentDraw.substring(5,7) - 1, currentDraw.substring(8,10),
                               currentDraw.substring(11,13),currentDraw.substring(14,16),currentDraw.substring(17,19));
        nextDraw = new Date(currentDraw.getTime() + (5 * 60000));
        globalNextDraw = functions.convertDateToMySqlTimeStampString(nextDraw);
        console.log("Current Draw:",currentDraw, "Next draw:", globalNextDraw);
        var response="";
        data = {'nextDrawString': globalNextDraw};
        functions.httpPost("PUT", authorization, '/drawer/saveNextDrawDate', JSON.stringify(data),
        function(data){
            response += data;
        },
        function(end){
            df.resolve(input);
        },
        function(error){
            df.reject(error);
        });
        return df.promise;
    }

   //retrieve bets
   function retrieveActiveBets(input){
       console.log("========= retrieving active bets ");
       numbers = [];
       df = new Q.defer();
       response = "";
       functions.httpGet(authorization, '/drawer/retrieveActiveBets', functions.fromIsoToEuroWithoutDelimiters(input.drawDateTime),
       function(data){
           response += data;
       },
       function(end){
         json = JSON.parse(response);
         input.bets = [];
         input.bets = json.bets;
         input.drawInfo.bets = json.bets.length;
         df.resolve(input);
       },
       function(error){
           df.reject(error);
       });
       return df.promise;
   }

    //checkBets
    function checkBets(input){
          console.log("========= checking bets");
          input.winningBets;
          df = new Q.defer();
          drawNumbers = input.drawNumbers;
          if (input.bets.length == 0){
            input.drawInfo.winningBets = 0;
            input.drawInfo.betsIncome = 0;
            input.drawInfo.betsOutcome = 0;
            df.resolve(input);
          }
          input.bets.forEach(function(bet, index){
               matches = 0;
               bet.betNumbers.split(",").forEach(function(number, indexNumbers){
                   if(drawNumbers.indexOf(+number) > -1){
                       matches++;
                   }

                   if  (indexNumbers == 11){
                       bet.draws++;
                       bet.matches = matches;
                       bet.drawTimeStamp = input.drawDateTime;
                       input.drawInfo.winningBets = 0;
                       input.drawInfo.betsIncome = 0;
                       input.drawInfo.betsOutcome = 0;
                       query = "select returnRate from rates where gameType = " + bet.gameType + " and matches = " + bet.matches;
                       connection.query(query, result, function(err, rates)     {
                             if(err){
                                 df.reject(errorFunction(err));
                             } else {
                                 earnings = 0;
                                 input.drawInfo.betsIncome += bet.betCoins;
                                 if(rates.length > 0){
                                   bet.returnRate = rates[0].returnRate;
                                   earnings = rates[0].returnRate * bet.betCoins;
                                   input.drawInfo.winningBets++;
                                   input.drawInfo.betsOutcome += earnings;
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
        console.log("========= updating bets");
        df = new Q.defer()
        if (input.bets.length != 0){
            functions.httpPost("PUT", authorization, '/drawer/updateBets', JSON.stringify({bets: input.bets}),
            function(data){
                response += data;
            },
            function(end){
              df.resolve(input);
            },
            function(error){
                df.reject(error);
            });
        } else {
            df.resolve(input);
        }
        return df.promise;
    }

    function storeDrawInfo(input){
        console.log("========= store draw info");
        df = new Q.defer();
//        values = {
//            drawDateTime: input.drawInfo.drawDateDime,
//            bets: input.drawInfo.bets,
//            winningBets: input.drawInfo.winningBets,
//            betsIncome: input.drawInfo.betsIncome,
//            betsOutcome: input.drawInfo.betsOutcome
//        }
        connection.query("insert into draw_info set ?", input.drawInfo, function(err, insertResult) {
            if(err)
                console.log("========= draw info not stored because of the following error : ", err);
           console.log("input " , input.drawInfo);
           df.resolve("========= Draw info inserted successfully");
        });
        return df.promise;
    }


