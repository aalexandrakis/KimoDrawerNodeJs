module.exports = {

convertDateToMySqlTimeStampString : function(timestamp){
                                         return timestamp.getFullYear().toString() + "-" +
                                         (timestamp.getMonth() + 1 < 10 ? ("0" + timestamp.getMonth() + 1) : (timestamp.getMonth() + 1)).toString() + "-"+
                                         (timestamp.getDate() < 10 ? "0" + timestamp.getDate() : timestamp.getDate()).toString() + " " +
                                         (timestamp.getHours() < 10 ? "0" + timestamp.getHours() : timestamp.getHours()).toString() + ":" +
                                         (timestamp.getMinutes() < 10 ? "0" + timestamp.getMinutes() : timestamp.getMinutes()).toString() + ":" +
                                         (timestamp.getSeconds() < 10 ? "0" + timestamp.getSeconds() : timestamp.getSeconds()).toString();
                                     }

}