app.controller('AppCtrl', ['$rootScope', '$scope', '$http', function($rootScope, $scope, $http) {


    // $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
    //     console.log('state', fromState, toState);
    // })

    if(localStorage && localStorage.getItem('auth_token')) {
        $http.defaults.headers.common.Authorization = localStorage.getItem('auth_token');
        $rootScope.authorized = true;
    }







	/**
     * Sidebar Toggle & Cookie Control
     */
    var mobileView = 992;

    $scope.getWidth = function() {
        return window.innerWidth;
    };

    $scope.$watch($scope.getWidth, function(newValue, oldValue) {
        if (newValue >= mobileView) {
            if (angular.isDefined(localStorage.getItem('toggle'))) {
                $scope.toggle = ! localStorage.getItem('toggle') ? false : true;
            } else {
                $scope.toggle = true;
            }
        } else {
            $scope.toggle = false;
        }

    });

    $scope.toggleSidebar = function() {
        $scope.toggle = !$scope.toggle;
        localStorage.setItem('toggle', $scope.toggle);
    };

    window.onresize = function() {
        $scope.$apply();
    };
}])