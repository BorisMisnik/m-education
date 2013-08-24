var mongoose = require('mongoose');
var index_model = require('../models/init');

module.exports.getText = function(str,callback){
	index_model.mobile.find(function(err, data){
		if( err ) return console.log( err );

		if( str === 'mobile' )
			callback( data.aboutMobile );
		else
			callback( data.aboutApp );
	});	
};


module.exports.saveText = function(str, data, callback){
	index_model.mobile.findOne(function(err, res){
		if( err ) console.log('find main object err',  err );
		if( str === 'mobile' )
			res.aboutMobile = data;
		else
			res.aboutApp = data;

		res.save(function(err){
			if( err ) return console.log( 'save new value err', err );
			callback('OK');

		});

	})
};