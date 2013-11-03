function EditCtrl($scope, Parse){

	$scope.error = false;
	// get content
	$scope.query = function(){
		Parse.queryText({
			collection : 'MainPage',
			colomun : $scope.category
		}, function(result){
			if( result.error ){
				$scope.error = true;
				$scoe.textError = result.error;
			}
			else{
				$scope.error = false;
				$scope.text  = result.result;
				$scope.$apply();
			}
		});
	};

	// save content
	$scope.save = function(){
		Parse.saveText({
			collection : 'MainPage',
			colomun : $scope.category,
			data : $scope.text
		});
	};

	$scope.$watch('category', function(){
		$scope.query();
	});
	$scope.category = 'mobile';
}