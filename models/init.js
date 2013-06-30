var mongo = require('mongoose');
var mongoUri = process.env.MONGOLAB_URI ||
				process.env.MONGOHQ_URL	||
				'mongodb://localhost/test';

// mongodb connection
module.exports.dbConnect = function( startServer ){

	mongo.connect(mongoUri);
	var db = module.exports.db = mongo.connection;

	db.on('error', console.error.bind(console, 'connection db error'));
	db.once('open', startServer);

};