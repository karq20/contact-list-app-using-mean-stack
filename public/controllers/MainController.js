var app = angular.module("myApp", []);

app.controller('MainController', ['$scope', '$http',
   function($scope, $http){

    var refresh = function() {
		//when it receives back the response successfully, it puts the response data into the html file and browser
		$http.get('/contactlist').success(function(response) {
			console.log("I got the data I requested");
			$scope.contactList = response;
			$scope.contact = "";
		});
		
    };
  

    refresh();

	$scope.addContact = function() {
		console.log($scope.contact);
			
		if(typeof parseInt($scope.contact.number) === NaN) {
			console.log("number is not a number!");
		} else {

			//making sure controller receives new data from database
			$http.post('/contactlist', $scope.contact).success(function(response){
				console.log(response);
				refresh();
			});	

		}
	};
	
	$scope.remove = function(id) {
		console.log(id);
		$http.delete('/contactlist/' + id).success(function(response) {
			refresh();
		});
	};
	
	$scope.edit = function(id) {
		console.log(id);
		$http.get('/contactlist/' + id).success(function(response) {
			$scope.contact = response;
			
		});
		
	};
	
	$scope.update = function(id) {
		console.log(id);
		if(typeof parseInt($scope.contact.number) === NaN) {
			console.log("number is not a number!");
		}
		else {
			$http.put('/contactlist/' + $scope.contact._id, $scope.contact).success(function(response) {
			refresh();
		});

		}

	};
	
	$scope.deselect = function() {
		$scope.contact = "";
	}
			
  }
]);
