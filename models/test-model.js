var mongoose = require('mongoose')
	, index_model = require('../models/init')
	, fs = require('fs')
	, async = require('async')
	, rand  = require('generate-key');

// save test to db
exports.uploadTest = function(test, myFunc){
	var clientTest = test.test;
	var newTest = {};
	var d = new Date();
	var date = {
		m : d.getMonth() + 1,
		y : d.getFullYear(),
		d : d.getDate()
	}
	date.d = date.d < 10 ? '0' + String(date.d) : date.d;
	date.m = date.m < 10 ? '0' + String(date.m) : date.m;
	var testDay = date.d + '/' + date.m + '/' + date.y;

	newTest.title = clientTest.title;
	newTest.description = clientTest.description;
	newTest.images = [];
	newTest.questions = [];
	newTest.id = rand.generateKey(7);
	newTest.time = testDay;

	async.parallel([
		function(callback){
			async.map(clientTest.images, saveFile, function(err, result){
				if( err ) throw err;

				if( clientTest.images.length ===  result.length ){
					callback();
				}

			});
		},
		function(callback){
			async.map(clientTest.questions, pushQuestion, function(err, result){
				if( err ) throw err;

				if( clientTest.questions.length ===  result.length){
					callback();	
				}
			});
		}
	], uploadToDb);

	function saveFile(image, callback){
		var base64Data = image.data.replace(/^data:image\/\w+;base64,/, '');
		var buf = new Buffer(base64Data, 'base64');
		var path = './assets/style/img/' + image.name;

		fs.writeFile(path, buf, function(err){
			if( err ) callback(err);

			var newImage = {
				path : path,
				description : image.description
			}
			newTest.images.push( newImage );
			callback(null, '');
		});
	};

	function pushQuestion(data, callback){
		var newQuestion = {
			question : data.question,
			answer : data.answer
		}
		newTest.questions.push(newQuestion);
		callback(null, '');
	};


	function uploadToDb(){
		index_model.mobile.update('app', {$push : { app : newTest }}, function(err, data){
			if( err ) throw err;
			myFunc(data);
		})
	}

} 

// get all tests
exports.getTests = function(myFunc){
	index_model.mobile.find('main.app', function(err, data){
		if( err ) throw err;

		var result = data[0].app;
		myFunc(result);
	});
}

// remove test
exports.deleteTest = function(id){
	console.log( 'data ', id );
	index_model.mobile.removeTest(id);
}