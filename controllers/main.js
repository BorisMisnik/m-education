var model = require('../models/model')
  , async = require('async');

exports.main = function(req, res){
	var data = {};

	async.parallel([
    	function(callback){
    		model.getItem('MainPage', 'LLLgLQHeXe', function(result){
				data.app = result.app;
				data.mobile = result.mobile;
				callback(null);
			});
    	},
    	function(callback){
    		model.getItem('Tests', '', function(result){
				data.tests = result.results;
				callback(null);
			});
    	}
	], function(err, result){
		res.render('index', {
			mobile : data.mobile,
			app : data.app,
			tests : data.tests
		}); 
	});
};

exports.save = function(req, res){
	var data = {
		name : req.body.name,
		email : req.body.email,
		message : req.body.message
	};

	model.saveItem('Feedback', data, function(){
		res.redirect('/');
	});
}