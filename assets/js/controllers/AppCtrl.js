function AppCtrl($scope, $location){
	$scope.path = $location.path();
	$scope.$on('$routeChangeSuccess', function(){
		$scope.path = $location.path();
	});
}