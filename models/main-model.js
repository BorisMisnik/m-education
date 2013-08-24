var mongoose = require('mongoose');
var index_model = require('../models/init');
var test_model = require('../models/test-model');

module.exports.getContent = function(callback){
	index_model.mobile.findOne(function(err, data){
		if( err ) return console.log( err );
		respond = {
			mobile : data.aboutMobile,
			app : data.aboutApp
		}
		// get all test
		test_model.getTests(function(data){
			respond.themes =  data;
			callback(respond)
		})
	});
}
