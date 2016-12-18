(function(){
	var app = angular.module('App');

	app.controller('LoginCtrl', ['$scope', '$state', 'ApiService', 'UserService', 
		
	function($scope, $state, ApiService, UserService) {
		$scope.ctr = {
			email: null,
			password: null,
		}

		$scope.login = function() {
			var reqObj = {
				email: $scope.ctr.email,
				password: $scope.ctr.password,
			}
			UserService.login(reqObj, function(err, res) {
				if(err) {
					return console.error(err);
				}
				$state.go('app.news');
			})
		}
	      
	}])

	app.controller('RegisterCtrl', ['$scope', 'ApiService', function($scope, ApiService) {
	      ApiService.getArticles(null, function(err, res) {
	      	$scope.news = res.results;
	      })
	}])
})();