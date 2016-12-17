(function(){

	angular.module('App').controller('NewsCtrl', ['$scope', 'ApiService', function($scope, ApiService) {
			console.log('AAAAAAAAAAA')
	      ApiService.getArticles(null, function(err, res) {
	      	$scope.news = res.results;
	      })
	}])
})();