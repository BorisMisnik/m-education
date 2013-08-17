var editModel = require('../models/edit-model');

module.exports.authorized = function(req, res, next){
	if( !req.session.auth )
		res.redirect('/admin')
	else
		next();
};

module.exports.edit = function(req, res){
	res.render('edit')
};

module.exports.getContent = function(req, res){
	var content = req.query.content;

	content === 'mobile' ? editModel.getText('mobile', respondRezult) : 
			     editModel.getText('aboutApp', respondRezult);

	function respondRezult(rezult){
		res.send( rezult );
	}

};

module.exports.saveContent = function(req, res){
	var content = req.body.content;
	var data = req.body.data;

	content === 'mobile' ? editModel.saveText('mobile', data, respondRezult) : 
				 editModel.saveText('aboutApp', data, respondRezult);

	function respondRezult(string){
		if( string === 'OK' )
			res.send('OK');
	}

};