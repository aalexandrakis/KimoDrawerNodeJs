module.exports = {

convertDateToMySqlTimeStampString : function(timestamp){
                                         return timestamp.getFullYear().toString() + "-" +
                                         (timestamp.getMonth() + 1 < 10 ? ("0" + timestamp.getMonth() + 1) : (timestamp.getMonth() + 1)).toString() + "-"+
                                         (timestamp.getDate() < 10 ? "0" + timestamp.getDate() : timestamp.getDate()).toString() + " " +
                                         (timestamp.getHours() < 10 ? "0" + timestamp.getHours() : timestamp.getHours()).toString() + ":" +
                                         (timestamp.getMinutes() < 10 ? "0" + timestamp.getMinutes() : timestamp.getMinutes()).toString() + ":" +
                                         (timestamp.getSeconds() < 10 ? "0" + timestamp.getSeconds() : timestamp.getSeconds()).toString();
                                    },

convertDateToIsoString : function(timestamp){
                                         return (timestamp.getDate() < 10 ? "0" + timestamp.getDate() : timestamp.getDate()).toString() +
                                         (timestamp.getMonth() + 1 < 10 ? ("0" + timestamp.getMonth() + 1) : (timestamp.getMonth() + 1)).toString() +
                                         timestamp.getFullYear().toString() +
                                         (timestamp.getHours() < 10 ? "0" + timestamp.getHours() : timestamp.getHours()).toString() +
                                         (timestamp.getMinutes() < 10 ? "0" + timestamp.getMinutes() : timestamp.getMinutes()).toString()+
                                         (timestamp.getSeconds() < 10 ? "0" + timestamp.getSeconds() : timestamp.getSeconds()).toString();
                                    },

fromIsoToEuro: function(dateString){
		var regExp = /(\d{4}).(\d{2}).(\d{2}).(\d{2}).(\d{2}).(\d{2}).*/;
		dateArray = regExp.exec(dateString);
		return dateArray[3] + "-" + dateArray[2] + "-" + dateArray[1] + " " + dateArray[4] + ":" + dateArray[5] + ":" + dateArray[6];
},

fromEuroToIsoWithDelimiters: function(dateString){
			var regExp = /(\d{2})(\d{2})(\d{4})(\d{2})(\d{2})/;
			dateArray = regExp.exec(dateString);
			return dateArray[3] + "-" + dateArray[2] + "-" + dateArray[1] + " " + dateArray[4] + ":" + dateArray[5];
},

httpPost: function(method, authorization, url, data, dataCallBack, endCallBack, errorCallBack){
    path = 'http://' + process.env.KIMO_HOST +  (process.env.KIMO_PORT ? ':' + process.env.KIMO_PORT : '') + '/' + url;
    http = require('http');
    options = {
        path: path,
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + authorization,
            'Content-Length': Buffer.byteLength(data)
        }
    };
    newReq = http.request(options, function(newRes) {
        newRes.setEncoding('utf8');
        newRes.on('data', function (result) {
            dataCallBack(result);
        });
        newRes.on('end', function (result) {
            endCallBack(result);
        });
    });
    newReq.on('error', function(error){
        errorCallBack(error);
    });
    newReq.write(data);
    newReq.end();
},

httpGet: function(authorization, url, data, dataCallBack, endCallBack,  errorCallBack){
    path = 'http://' + process.env.KIMO_HOST +  (process.env.KIMO_PORT ? ':' + process.env.KIMO_PORT : '') + '/' + url;
    http = require('http');
    options = {
        path: path + "/" + data,
        method: "GET",
        headers: {
            'Authorization': 'Basic ' + authorization,
            'Connection': 'keep-alive',
            'accept':'text/html;application/json',
            'accept-encoding':'gzip, deflate, sdch',
            'accept-language': 'en-US,en;q=0.8',
            'content-type': 'text/plain',
            'content-length':0
        }
    };
    newReq = http.request(options, function(newRes) {
        newRes.setEncoding('utf8');
        newRes.on('data', function (result) {
            dataCallBack(result);
        });
        newRes.on('end', function (end) {
            endCallBack(end);

        });

    });
    newReq.on('error', function(error){
        errorCallBack(error);
    });
//    newReq.write(data);
    newReq.end();
}


}