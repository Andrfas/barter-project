(function () {
    'use strict';
    angular.module('App').service('UserService', UserService);

    UserService.$inject = ['$http', 'ApiService', '$rootScope'];
    function UserService($http, ApiService, $rootScope) {
        var self = this;

        this.login = function (data, cb) {
            var reqObj = {
                email: data.email,
                password: data.password,
            }
            ApiService.login(reqObj, function(err, res) {
                if(err) {
                    console.error('ERROR', err);
                    return cb(err);
                }
                
                localStorage.setItem('auth_token', res.auth_token);
                $http.defaults.headers.common.Authorization = res.auth_token;
                $rootScope.authorized = true;
                cb(null, res);
            })
        };

        this.logout = function (data, cb) {
            ApiService.logout(null, function(err, res) {
                if(err) {
                    console.error('ERROR', err);
                    return cb(err);
                }
                
                $rootScope.authorized = false;
                $http.defaults.headers.common.Authorization = null;
                localStorage.removeItem('auth_token');
                if(cb) cb(null, res);
            })
        };

        this.register = function (data, cb) {
            var reqObj = {
                email: data.email,
                password: data.password,
                firstName: data.firstName,
                lastName: data.lastName,
            }
            ApiService.register(reqObj, function(err, res) {
                if(err) {
                    console.error('ERROR', err);
                    return cb(err);
                }
                
                localStorage.setItem('auth_token', res.auth_token);
                $http.defaults.headers.common.Authorization = res.auth_token;
                $rootScope.authorized = true;
                if(cb) cb(null, res);
            })
        };
    }
})();
