var mongoose = require('mongoose');
var ReviewSchema = mongoose.Schema({
	email : String,
	name : String,
	message : String,
	date : {type : Date, default : new Date()}
});
var Reviews = mongoose.model('Reviews', ReviewSchema);
exports.getAll = function(callback){
	Reviews.find(function(err, result){
		if( err ) throw err;
		callback(result);
	})
};

exports.deleteReview = function(id){
	Reviews.findByIdAndRemove(id, function(err, res){
		if( err ) throw err;
	})
};

exports.saveReview = function(data, callback){
	var r = new Reviews();
	r.email = data.email;
	r.name = data.name;
	r.message = data.message;
	r.save(callback);
}