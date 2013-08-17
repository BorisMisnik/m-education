var mongo = require('mongoose');
var mongoUri = process.env.MONGOLAB_URI ||
				process.env.MONGOHQ_URL	||
				'mongodb://localhost/test';
var MobileSchema = mongo.Schema({
	main : {
		aboutMobile : { type : String, default : ' ' },
		aboutApp : { type : String, default : ' ' }
	},
	app : [],
	reviews : []
});

// remove test method
MobileSchema.methods.removeTest = function(id){
	return this.model('Mobile').find('app', function(err, data){
		if( err ) throw err;
		console.log( data );
	})
};

var Mobile = mongo.model('Mobile', MobileSchema);
var content = module.exports.mobile = new Mobile();

// mongodb connection
module.exports.dbConnect = function( startServer ){

	mongo.connect(mongoUri);
	var db = module.exports.db = mongo.connection;

	db.on('error', console.error.bind(console, 'connection db error'));
	db.once('open', startServer);

	// crate mobileSchema

	Mobile.find('main.aboutMobile', function(err, main){
		if( err ) {
			return console.log( err );
		}
		else if ( !main.length ){
			content.save();
			content.removeTest();  
		}
	});
	console.log( 'db connect to: ', mongoUri)
};