function TestsCtrl($scope, $timeout, $location, Parse, Modal){
	$scope.question = function(id){
		$location.path('/test/' + id);
	};

	$scope.change = function(test){
		$scope.modal = {
			title : test.title,
			about : test.about,
			id : test.id
		};
		Modal.show();
	};

	$scope.saveChange = function(id){
		delete $scope.modal.id;

		Parse.updateItem($scope.modal, 'Tests', function(){
			Modal.hide();
			$timeout(function(){
				$scope.getTests();
			}, 1000);
			
		}, {'objectId' : id});
	};

	$scope.remove = function(id){
		Parse.removeItem('Tests', id, function(){
			$timeout(function(){
				$scope.getTests();
			}, 1000);
		});
	};

	$scope.save = function(){
		Parse.saveItem({
			title : $scope.title,
			about : $scope.about
		},'Tests' ,function(result){
			if( result.error ){
				$scope.error = true;
				$scope.success = false;
				$scope.textError = result.error;
			}
			else{
				$scope.success = true;
				$scope.error = false;
			}
			$timeout(function(){
				$scope.getTests();
			}, 1000);
		});
	};

	$scope.getTests = function(){
		Parse.getItems('Tests', function(result){
			if( !result.error ){
				$scope.tests = [];
				var i = 0,
					max = result.length;

				for (; i < max; i++) {
					if( !result[i] ) break;

					var obj = {
						id : result[i].id,
						title : result[i].get('title'),
						about : result[i].get('about')
					};
					$scope.tests.push(obj);
				}
				$scope.$apply();
			}
		});
	};
	$scope.getTests();
}