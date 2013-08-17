var mongoose = require('mongoose');
var index_model = require('../models/init');

module.exports.getContent = function(callback){

	index_model.mobile.findOne('main', function(err, data){
		if( err ) return console.log( err );
		var respond = {
			mobile : data.main.aboutMobile,
			app : data.main.aboutApp,
			themes : data.app
		}
		callback(respond);

	})
}