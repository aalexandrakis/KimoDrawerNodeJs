var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'kimo',
  password : 'kimo',
  port : 3306, //port mysql
  database:'kimo'
});

module.exports = {

    getUsers: function(app){
                connection.connect(function(err) {
                                        // connected! (unless `err` is set)
                                        if (err)
                                                console.log(err);
                                        connection.query("Select * from users", function(err, result){
                                                if (err)
                                                console.log(err);
                                                console.log(result);
                                                global.users = result;
                                        });
                });
              }
}
//});
//		i = 0;
//test = 		setInterval(function(){
//		    i++;
//		    console.log("Hello  ", process.argv[2], " ", i);
//		}, 1000, 10, 10);
//
//		test;
