function MessageCtrl($scope, $timeout, Parse, Modal){

	$scope.getItems = function(){
		Parse.getItems('Feedback', function(result){
			$scope.feedbacks = [];
			for (var i = 0; i < result.length; i++) {
				var obj = {};
				obj.id = result[i].id;
				obj.name = result[i].get('name');
				obj.email = result[i].get('email');
				obj.message = result[i].get('message');
				$scope.feedbacks.push(obj);
			};
			$scope.$apply();
		});
	};
	$scope.getItems();

	$scope.watch = function(feedback){
		$scope.modal = {};
		$scope.modal.message = feedback.message;
		$scope.modal.email = feedback.email;
		Modal.show();
	};

	$scope.remove = function(id){
		Parse.removeItem('Feedback', id, function(){
			$timeout(function(){
				$scope.getItems();
			}, 1000);
		});
	};

};