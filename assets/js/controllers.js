app.controller('EditCtrl', function($scope, $http, Main){

	$scope.category = 'mobile';

	function respond(data){
		$scope.text = data;
			$('#text')
				.data('wysihtml5')
				.editor
				.setValue($scope.text);
	};

	$scope.save = function(){
		Main.save({
			content : $scope.category,
			data : angular.element('textarea').val()
		}, function Response(data){
			if( data[0] === 'O' && data[1] === 'K' )
				console.log( 'OK' )
		});
	};

	$scope.changeSelect = function(){
		$http({method : 'GET', url : '/admin/edit/content', params : {content : $scope.category} })
			.success(respond);
	};

	$scope.changeSelect();

});
// add new test controller
app.controller('AddCtrl', function($scope, $http, $compile, Test){
	
	// new test
	var test = {};

	// jquery selector 
	$file = $('[name="file"]');
	$question = $('[name="question"]');

	// 	amount images and amount questions
	$scope.indexImg = 0;
	$scope.indexQuestion = 0

	$scope.$watch('indexImg', function( newValue, oldValue ){
		if( newValue ===  $file.length && 
			$scope.indexQuestion === $question.length )
		{
			console.log('upload')
			uploadTest();

		}
	});

	// send form
	function uploadTest(){
		Test.save({test : test, method : 'saveTest'}, 
			function Response(data, status, headers){
				if( data[0] === 'O' && data[1] === 'K' ){
					alert.success();
					window.location = window.location.href;
				}
					
				else
					alert.error();
			});
	};
	// alerts
	function Alerts(){
		$scope.info = false;
		$scope.success = false;
		$scope.error = false;
	};
	var alert = new Alerts();
	// hide all alerts
	Alerts.prototype.close = function(){
		$scope.info = false;
		$scope.success = false;
		$scope.error = false;
	};
	//  error alerts
	Alerts.prototype.error = function(){
		$scope.info = false;
		$scope.success = false;
		$scope.error = true;
	};
	// info alerts
	Alerts.prototype.info = function(){
		$scope.info = false;
		$scope.success = true;
		$scope.error = false;
	};
	// success alerts
	Alerts.prototype.success = function(){
		$scope.info = false;
		$scope.success = true;
		$scope.error = false;	
	}

	// close all alerts
	$scope.closeAlert = function(){
		alert.close();
	};	

	// add new Question
	$scope.addQuestion = function(){
		var container = $('.question .root:last');
		var template = $('<newquestion>').insertAfter(container);
		var linkFn = $compile(template);

		linkFn($scope);
	};

	// add new Image
	$scope.addImage = function(){
		var container = $('.image .root:last');
		var template = $('<newimage>').insertAfter(container);
		var linkFn = $compile(template);

		linkFn($scope);
	};

	// submit form
	$scope.newTest = function(){

		// jquery selector 
		$file = $('[name="file"]');
		$question = $('[name="question"]');

		// reset amount images and question
		$scope.indexImg = 0;
		$scope.indexQuestion = 0

		//show info alert
		alert.info()

		test.title = angular.element('#title').val();
		test.description = angular.element('#description').val();
		test.images = [];
		test.questions = [];
		// images
		$file.each(function(i){
			$this = $(this);

			if( !$this.val() ){
				$scope.indexImg++;
				setTimeout(function(){$scope.$apply();},0);
				return;
			}

			var reader = new FileReader();
			var file = $this.get(0).files[0];
			var name = file.name;
			var description = $this.parent().find(':text').val();
			reader.readAsDataURL(file);
			reader.onload = ready;

			function ready(event){
				var data = event.target.result;
				saveImage(data, name, description);
			};

		});

		// questions
		$question.each(function(){
			$this = $(this);
			var que = $this.val();
			var answer = $this.parent().find('input[name="answer"]').val();

			if( que.length === 0 || answer.length === 0 ){
				$scope.indexQuestion++;
				setTimeout(function(){$scope.$apply();},0);
				return;
			}
			saveQuestion(que, answer);
		});

		// add image
		function saveImage(data, name, description){
			var img = {};
			img.data = data
			img.name = name;
			img.description = description;

			test.images.push(img);
			$scope.indexImg++;
			$scope.$apply();
		}

		// add to question
		function saveQuestion(que, ans){
			var q = {};
			q.question = que;
			q.answer = ans;

			test.questions.push(q);
			$scope.indexQuestion++;
		}
	};
});

app.controller('EditTest', function($scope, Test){
	// get all tests
	$scope.getTests = function(){
		Test.get({method : 'getAllTest'}, function(res){
			$scope.tests = res;
			// reverse result array
			$scope.reverseTest = function(array){
				var copy = [].concat(array);
				return copy.reverse();
			}
		});
	}
	$scope.getTests();

	// remove test
	$scope.remove = function(index, id){
		// remove test query
		Test.remove({
			method : 'removeTest',
			id : id
		});
		$scope.getTests();
	}	

});

// ReviewsCtrl 
app.controller('ReviewsCtrl', function($scope, Reviews){
	// get all reviews
	function get(){
		Reviews.get({method : 'getAllReviews'}, function(data){
			$scope.items = data;
		});
	}
	get();
	// remove reviews
	$scope.remove = function(index, id){
		Reviews.remove({
			method : 'removeReview',
			id : id
		});
		// get all reviews
		get();
	};
})
