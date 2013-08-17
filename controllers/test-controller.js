var model = require('../models/test-model');

exports.saveTest = function(req, res){
	model.uploadTest(req.body, function(result){
		if( result ){
			res.send('OK')
		}
		else{
			res.send('error');
		}
	});
}

exports.getAllTest = function(req, res){
	model.getTests(function(result){
		res.send(result);
	});
}

exports.removeTest = function(req, res){
	var id = req.query.id;
	model.deleteTest( id );
};