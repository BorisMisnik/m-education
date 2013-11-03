exports.auth = function(req, res){
	if( !req.session.auth )
		res.render('auth');
	else
		res.render('edit');	
};

exports.authorized = function(req, res){
	var email = req.body.email;
	var pass  = req.body.password;
	if( email === '1' && pass === '1' ){
		req.session.auth = true;
		res.redirect('/admin')
	}
};