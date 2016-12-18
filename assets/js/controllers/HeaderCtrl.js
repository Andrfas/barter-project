(function(){
	var app = angular.module('App');

	app.controller('HeaderCtrl', ['$scope', '$state', 'UserService', 
		
	function($scope, $state, UserService) {
		$scope.ctr = {
			logout: UserService.logout
		}
	      
	}])
})();