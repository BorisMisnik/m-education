var mongoose = require('mongoose')
	, index_model = require('../models/init')
	, fs = require('fs')
	, async = require('async')
	, rand  = require('generate-key');

var TestSchema = mongoose.Schema({
	images : Array,
	questions : Array,
	title : String,
	description : String,
	time : String
});
var Test = mongoose.model('AllTest', TestSchema);
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

	newTest.images = [];
	newTest.questions = [];

	async.parallel([
		function(callback){
					console.log(clientTest.images.length)
			async.map(clientTest.images, saveFile, function(err, result){
				if( err ) throw err;

				if( clientTest.images.length ===  result.length ){
					callback();
				}

			});
		},
		function(callback){
			console.log(clientTest.questions.length)
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
				path : '/style/img/' + image.name,
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
		// test Schema
		var m = new Test();
		m.images  = newTest.images;
		m.questions = newTest.questions;
		m.title = clientTest.title;
		m.description = clientTest.description;
		m.time = testDay;
		m.save(myFunc(true));
	}

} 

// get all tests
exports.getTests = function(myFunc){
	Test.find(function(err, data){
		if( err ) throw err;
		myFunc(data);
	});
}

// remove test
exports.deleteTest = function(id){
	Test.findByIdAndRemove(id, function(err, result){
		if(err) throw err;
	});
}