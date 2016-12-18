(function () {
    'use strict';
    angular.module('App').service('ApiService', ApiService);

    var API_DOMAIN = 'http://localhost:1337';

    ApiService.$inject = ['$http'];
    function ApiService($http) {
        var self = this;

        // ARTICLES
        this.getArticles = function (data, cb) {
            var reqStr = '/api/articles';
            
            $http.post(API_DOMAIN+reqStr)
                .then(function (res, status, headers, config) {
                    if(cb) cb(null, res.data);
                })
                .catch(cb);
        };

        // USER
        this.login = function (data, cb) {
            var reqStr = '/api/login';
            var reqObj = {
                email: data.email,
                password: data.password
            }
            
            $http.put(API_DOMAIN+reqStr, reqObj)
                .then(function (res, status, headers, config) {
                    if(cb) cb(null, res.data);
                })
                .catch(cb);
        };

        this.logout = function (data, cb) {
            var reqStr = '/api/logout';
            $http.put(API_DOMAIN+reqStr)
                .then(function (res, status, headers, config) {
                    if(cb) cb(null, res.data);
                })
                .catch(cb);
        };

        this.register = function (data, cb) {
            var reqStr = '/api/users';
            var reqObj = {
                email: data.email,
                password: data.password,
                firstName: data.firstName,
                lastName: data.lastName,
            }
            
            $http.put(API_DOMAIN+reqStr, reqObj)
                .then(function (res, status, headers, config) {
                    if(cb) cb(null, res.data);
                })
                .catch(cb);
        };
    }
})();
