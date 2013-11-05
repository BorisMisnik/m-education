var app = angular.module('admin', ['appService']);

app.config(['$routeProvider', function($routeProvider){
	$routeProvider
		.when('/edit', {templateUrl: '/partials/edit.html', controller:'EditCtrl' })
		.when('/tests', {templateUrl : '/partials/tests.html', controller:'TestsCtrl'})
		.when('/test/:id', {templateUrl : '/partials/test.html', controller:'TestCtrl'})
		.when('/message', {templateUrl : '/partials/message.html', controller:'MessageCtrl'})
		.otherwise({redirectto:'/edit'});
}])
.config(function(){
	Parse.initialize("hCfZBoZFJgZYnw0m03Vzf3Wk1PDCV1tUGbMYHnHs",
                     "Q98bVrTOHLTp16AdkWx8CxRx3jYrjlrli1DvkuzI");
});