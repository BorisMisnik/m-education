var model = require('../models/reviews-model');
// get all reviews
exports.reviews = function(req, res){
	model.getAll(function(data){
		res.send(data);
	});
};
// remove review
exports.removeReview = function(req, res){
	var id = req.query.id;
	model.deleteReview(id);
}
// save review
exports.save = function(req, res){
	model.saveReview(req.body, function(){
		res.redirect('/');
	})
};