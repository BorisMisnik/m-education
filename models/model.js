var Parse = require('node-parse-api').Parse;

var APP_ID = 'hCfZBoZFJgZYnw0m03Vzf3Wk1PDCV1tUGbMYHnHs';
var MASTER_KEY = 'oOKRXO5CxrsNMV9aqRmaCgI2EuhlPdOun1bdOBLa';

var app = new Parse(APP_ID, MASTER_KEY);

exports.getItem = function(collectioName, id, callback){
	app.find(collectioName, id || {}, function(err, result){	
		callback(result);
	});
};

exports.saveItem = function(collectioName, data, callback){
	app.insert(collectioName, data, function (err, response) {
 		if( response )	callback();
	});
};