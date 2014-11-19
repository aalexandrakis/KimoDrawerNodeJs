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
}

}