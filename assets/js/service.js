angular.module('appService', ['ngResource'])
	.factory('Main', function($resource){
		return $resource('/admin/edit/content', {}, {
			save : {
				method: 'POST', 
				params:{content : '@content', data : '@save'}
			}
		});
	})
	.factory('Test', function($resource){
		return $resource('/admin/edit/:method', { method : '@method'}, {
			save : {
				method : 'POST',
				params : { test : '@test' }
			},
			get : {
				method : 'GET',
				isArray : true
			},
			remove : {
				method : 'DELETE',
				params : {
					id : '@id'
				}
			}
		});
	})
	.factory('Reviews', function($resource){
		return $resource('/admin/edit/reviews/:method', { method : '@method'}, {
			get : {
				method : 'GET',
				isArray : true
			},
			remove : {
				method : 'DELETE',
				params :  { id : '@id'}
			}
		})
	});