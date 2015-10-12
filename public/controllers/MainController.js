var app = angular.module("myApp", []);
//var $error = $('.error');

app.controller('MainController', ['$scope', '$http',
   function($scope, $http){

    var refresh = function() {
		//when it receives back the response successfully, it puts the response data into the html file and browser
		console.log("refresh method called");
		$http.get('/contactlist').success(function(response) {
			console.log("I got the data I requested");
			$scope.contactList = response;
			$scope.contact = "";
		});
		
    };
  
    refresh();

	$scope.addContact = function() {
	if($scope.contact.name.length > 0) {
	 	if(parseInt($scope.contact.number) != NaN) {
			console.log($scope.contact);
			//making sure controller receives new data from database
			$http.post('/contactlist', $scope.contact).success(function(response){
				console.log(response);
				refresh();
			});	

		}
		else {
			console.log("Phone number is not a number!");
			$('.error').text("Phone number is not a number!");
		}
	}
	else {
		console.log("Name cannot be blank!");
		$('.error').text("Name cannot be blank!");
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
		if($scope.contact.name.length > 0 && parseInt($scope.contact.number) != NaN) {
			$http.put('/contactlist/' + $scope.contact._id, $scope.contact).success(function(response) {
				refresh();
			});
		}
	/*	else {
			$('.error').text("Please enter proper name and number!");
		}*/
	};
	
	$scope.deselect = function() {
		$scope.contact = "";
	};

}]);
