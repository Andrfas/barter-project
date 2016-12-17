(function ()
{
    'use strict';
    angular.module('App').service('ApiService', ApiService);

    var API_DOMAIN = 'http://localhost:1337';

    ApiService.$inject = ['$http'];
    function ApiService($http) {
        var self = this;

        this.getArticles = function (data, cb) {
            var reqStr = '/api/articles';
            
            $http.post(API_DOMAIN+reqStr)
                .then(function (res, status, headers, config) {
                    if(cb) cb(null, res.data);
                })
                .catch(cb);
        };
    }
})();
