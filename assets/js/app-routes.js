var app = angular.module('App', ['ui.router', 'ui.bootstrap', 'oc.lazyLoad']);

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$urlMatcherFactoryProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider, $urlMatcherFactoryProvider) {

        // $locationProvider.html5Mode({
        //     enabled: true,
        //     requireBase: false
        // });

        // $urlRouterProvider.rule(function($injector, $location) {
        //     var path = $location.url();
        //     // check to see if the path already has a slash where it should be
        //     if (path[path.length - 1] === '/' || path.indexOf('/?') > -1 || path.indexOf('/#') > -1) {
        //         return;
        //     }

        //     if (path.indexOf('?') > -1) {
        //         return path.replace('?', '/?');
        //     }

        //     if (path.indexOf('#') > -1) {
        //         return path.replace('#', '/#');
        //     }

        //     return path + '/';
        // });

        // $urlMatcherFactoryProvider.caseInsensitive(true);
        // $urlMatcherFactoryProvider.strictMode(false);
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('app', {
                abstract: true,
                url: '',
                template: '<div ui-view></div>'
            })
            .state('app.home', {
                url: '/home',
                templateUrl: '/templates/index.html',
                controller:'IndexCtrl',
                resolve: load(['/js/controllers/IndexCtrl.js'])
            })
            .state('app.news', {
                url: '/news',
                templateUrl: '/templates/news.tpl.html',
                controller:'NewsCtrl',
                resolve: load(['/js/controllers/NewsCtrl.js'])
            })
            .state('app.login', {
                url: '/login',
                templateUrl: '/templates/login.html',
                controller:'LoginCtrl',
                resolve: load(['/js/controllers/UserCtrl.js'])
            })
            .state('app.register', {
                url: '/register',
                templateUrl: '/templates/register.html',
                controller:'RegisterCtrl',
                resolve: load(['/js/controllers/UserCtrl.js'])
            });

        function load(srcs, callback) {
            return {
                deps: ['$ocLazyLoad', '$q',
                    function($ocLazyLoad, $q) {
                        var deferred = $q.defer();
                        var promise = false;
                        srcs = angular.isArray(srcs) ? srcs : srcs.split(/\s+/);
                        if (!promise) {
                            promise = deferred.promise;
                        }
                        angular.forEach(srcs, function(src) {
                            promise = promise.then(function() {
                                // angular.forEach(MODULE_CONFIG, function(module) {
                                //     if (module.name == src) {
                                //         src = module.module ? module.name : module.files;
                                //     }
                                // });
                                return $ocLazyLoad.load(src);
                            });
                        });
                        deferred.resolve();
                        return callback ? promise.then(function() {
                            return callback();
                        }) : promise;
                    }
                ]
            }
        }

        function getParams(name) {
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                results = regex.exec(location.search);
            return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        }
    }]);