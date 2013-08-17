module.exports.auth = function(req, res){
	res.render('auth');
};

module.exports.login = function(req,res){
	var email = req.body.email;
	var pass  = req.body.pass;
	
	if( email === 'mobile@mobile.com' && pass === 'mobile1mobile' ){
		req.session.auth = true;
		res.send('OK');		
	}
	else{
		res.send('error');
	}
		
};