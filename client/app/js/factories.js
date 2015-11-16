/**
 * Created by linh on 11/14/15.
 */
angular.module('service.CRUD',[])
    .factory('CRUD', ["$http", function ($http) {
        return {
            get: function (url, callback, error) {
                return $http({
                    method: 'GET',
                    url: url
                }).
                    success(function (data, status, headers, config) {
                        callback(data);
                    }).
                    error(function (data, status, headers, config) {
                        if (error) {
                            error(data, status, headers, config);
                        }
                    });
            },
            create: function (url, value, callback, error) {
                return $http({
                    method: 'POST',
                    url: url,
                    data: value
                }).
                    success(function (data, status, headers, config) {
                        callback(data);
                    }).
                    error(function (data, status, headers, config) {
                        console.log("Failed to POST data. URL: " + url);
                        if (error) {
                            error(data, status, headers, config);
                        }
                    });
            },
            update: function (url, value, callback, error) {
                return $http({
                    method: 'PUT',
                    url: url,
                    data: value
                }).
                    success(function (data, status, headers, config) {
                        callback(data);
                    }).
                    error(function (data, status, headers, config) {
                        console.log("Failed to PUT data. URL: " + url + " Data: " + data);
                        if (error) {
                            error(data, status, headers, config);
                        }
                    });
            },
            delete: function (url, callback, error) {
                return $http({
                    method: 'DELETE',
                    url: url
                }).
                    success(function (data, status, headers, config) {
                        callback(data);
                    }).
                    error(function (data, status, headers, config) {
                        console.log("Failed to delete data. URL: " + url);
                        if (error) {
                            error(data, status, headers, config);
                        }
                    });
            }};
    }]);