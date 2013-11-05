function TestCtrl($scope, $routeParams, $timeout, Parse, Modal){
	var file = $('#file').get(0);
	var modalFile = $('#fileModal').get(0);
	var testId =  $routeParams.id;

	$scope.save = function(){
		if(file.files.length > 0){
			var image = file.files[0];
			var name = file.files[0].name;
			
			Parse.saveFile(image, name, function(result){
				if( result.error ){
					$scope.error = true;
					$scope.success = false;
					$scope.errorText = error.message;
					$scope.$apply();
				}
				else{
					var data = {
						question : $scope.question,
						answer : $scope.answer,
						confirmAnswer : $scope.confirmAnswer,
						testId : testId,
						file : result
					};

					Parse.saveItem(data, 'Test', function(){
						$scope.error = false;
						$scope.success = true;
						$scope.$apply();
						$scope.getItems();
					});
				}
			});
		}
		else{
			var data = {
				question : $scope.question,
				answer : $scope.answer,
				confirmAnswer : $scope.confirmAnswer,
				testId : testId
			};

			Parse.saveItem(data, 'Test', function(){
				$scope.error = false;
				$scope.success = true;
				$scope.$apply();
				$scope.getItems();
			});

		}

	};

	$scope.getItems = function(){
		Parse.getItems('Test', function(result){
			if( result.error ) return;
			$scope.questions = [];
			var i = 0,
				max = result.length;

			for (; i < max; i++) {
				if( !result[i] ) break;
				var obj = {
					question : result[i].get('question'),
					answer : result[i].get('answer'),
					confirmAnswer : result[i].get('confirmAnswer'),
					testId : result[i].get('testId'),
					id : result[i].id
				};

				if( result[i].get('file') ){
					obj.image = result[i].get('file').url();
				}

				$scope.questions.push(obj);
			}
			$scope.$apply();

		}, {testId : testId});
	};
	$scope.getItems();

	$scope.watch = function(src){
		$scope.modal = {};
		$scope.img = true;
		$scope.modal.img = src;

		Modal.show();
	};

	$scope.change = function(question){
		$scope.img = false;
		$scope.modal = {
			question : question.question,
			answer : question.answer,
			testId : question.testId,
			confirmAnswer : question.confirmAnswer,
			id : question.id
		};

		Modal.show();
	};

	$scope.update = function(id){
		if(modalFile.files.length > 0){
			var image = modalFile.files[0];
			var name = modalFile.files[0].name;
			
			Parse.saveFile(image, name, function(result){
				if( result.error ) return;

				$scope.modal.file = result;
				delete $scope.modal.id;
				Parse.updateItem($scope.modal, 'Test', function(){
					Modal.hide();
					$timeout(function(){
						$scope.getItems();
					}, 1000);
			
				}, {'objectId' : id});
			});
		}
		else{
			delete $scope.modal.id;
			Parse.updateItem($scope.modal, 'Test', function(){
				Modal.hide();
				$timeout(function(){
					$scope.getItems();
				}, 1000);
			}, {'objectId' : id});
		}
	};

	$scope.remove = function(id){
		Parse.removeItem('Test', id, function(){
			$timeout(function(){
				$scope.getItems();
			}, 1000);
		});
	};
}