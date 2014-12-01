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

addDelimitersToIsoDate : function(timestamp){
                         return timestamp.substring(0,4)+"-"+timestamp.substring(4,6)+"-"+timestamp.substring(6,8)+" "+
                                timestamp.substring(8,10)+":"+timestamp.substring(10,12)+":"+timestamp.substring(12,14);
},


fromIsoToEuro: function(dateString){
		var regExp = /(\d{4}).(\d{2}).(\d{2}).(\d{2}).(\d{2}).(\d{2}).*/;
		dateArray = regExp.exec(dateString);
		return dateArray[3] + "-" + dateArray[2] + "-" + dateArray[1] + " " + dateArray[4] + ":" + dateArray[5] + ":" + dateArray[6];
},

fromIsoToEuroWithoutDelimiters: function(dateString){
		var regExp = /(\d{4}).(\d{2}).(\d{2}).(\d{2}).(\d{2}).(\d{2}).*/;
		dateArray = regExp.exec(dateString);
		return dateArray[3] + dateArray[2] + dateArray[1] + dateArray[4] + dateArray[5] + dateArray[6];
},

fromEuroToIsoWithDelimiters: function(dateString){
			console.log(dateString);
		    return dateString.substring(4,8) + "-" + dateString.substring(2,4) + "-" + dateString.substring(0,2) + " " +
                   dateString.substring(8,10) + ":" + dateString.substring(10,12)  + (dateString.length > 12 ? ":" + dateString.substring(12,14) : "");
},



httpPost: function(method, authorization, url, data, dataCallBack, endCallBack, errorCallBack){
    http = require('http');
    options = {
        hostname: process.env.KIMO_HOST_NAME,
        port: process.env.KIMO_PORT || '',
        path: url,
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

httpPostOnline: function(method, authorization, url, data, dataCallBack, endCallBack, errorCallBack){
    http = require('http');
    options = {
//        hostname: process.env.KIMO_HOST_NAME,
//        port: process.env.KIMO_PORT || '',
        hostname: 'kimo-aalexandrakis.rhcloud.com',
        port: '',
        path: url,
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
    http = require('http');
//    http.get('http://kimo-aalexandrakis.rhcloud.com' + url + "/" + data, function(res){
//        dataCallBack(res);
//        endCallBack(res);
//    }).on('error', errorCallBack(error));
    options = {
        hostname: process.env.KIMO_HOST_NAME,
        port: process.env.KIMO_PORT || '',
        path: url + "/" + data,
        method: "GET",
        headers: {
            'Authorization': 'Basic ' + authorization,
            'Connection': 'keep-alive',
            'accept':'text/html;application/json',
            'accept-encoding':'deflate',
            'accept-language': 'en-US,en;q=0.8',
            'content-type': 'text/plain',
            'content-length':0
        }
    };
    newReq = http.request(options, function(newRes) {
        newRes.on('data', function (result) {
            dataCallBack(result.toString("UTF-8"));
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