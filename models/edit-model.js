var mongoose = require('mongoose');
var index_model = require('../models/init');

module.exports.getText = function(str,callback){
	index_model.mobile.findOne('main', function(err, data){
		if( err ) return console.log( err );

		if( str === 'mobile' )
			callback( data.main.aboutMobile );
		else
			callback( data.main.aboutApp );
	});	
};


module.exports.saveText = function(str, data, callback){
	index_model.mobile.findOne('main', function(err, rez){
		if( err ) console.log('find main object err',  err );

		if( str === 'mobile' )
			rez.main.aboutMobile = data;
		else
			rez.main.aboutApp = data;

		rez.save(function(err){
			if( err ) return console.log( 'save new value err', err );
			callback('OK');

		});

	})
};