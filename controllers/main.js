var main_model = require('../models/main-model');

module.exports.main = function(req, res){

	main_model.getContent(function(data){
		console.log( data.themes );
		res.render('index',{
			mobile : data.mobile,
			app : data.app,
			themes : data.themes
		}); 
	})
};