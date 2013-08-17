var app = angular.module('admin', ['appService']);

app.run(function(){
	// init editor
	$('#text').wysihtml5({
		'stylesheets': false
	});

	// init tabs
	$('.nav a:first').tab('show');
});