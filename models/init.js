var mongo = require('mongoose');
var mongoUri = process.env.MONGOLAB_URI ||
				process.env.MONGOHQ_URL	||
				'mongodb://localhost/test';
var MobileSchema = mongo.Schema({
	aboutMobile : { type : String, default : ' ' },
	aboutApp : { type : String, default : ' ' }
});

var Mobile  = mongo.model('Mobile', MobileSchema);
var content = new Mobile();

exports.mobile = Mobile;
// mongodb connection
exports.dbConnect = function( startServer ){

	mongo.connect(mongoUri);
	var db = exports.db = mongo.connection;

	db.on('error', console.error.bind(console, 'connection db error'));
	db.once('open', startServer);

	// crate mobileSchema
	Mobile.find(function(err, main){
		if( err ) {
			return console.log( err );
		}
		else if ( !main.length ){
			content.save(); 
		}
	});

	console.log( 'db connect to: ', mongoUri);
};