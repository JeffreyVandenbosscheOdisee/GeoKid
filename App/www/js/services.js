var baseUri = 'https://api.jeffreyvdb.be';
// var baseUri = 'http://localhost:8000';
// 

var headers = {
    'Accept': 'application/json',
    'AuthKey': localStorage.getItem('AuthKey')
};


var mod = angular.module('GeoKidApp.services', []);

mod.service('ApiService', function($q, $http) {
    var self = {
        'call': function(apiUri, method, headers, data) {
            console.log('call');
            // Start a 'promise' from AngularJS, with this you can dispatch your success / error handlers on the right time.
            var deferred = $q.defer();

            var req = {
                method: method,
                url: baseUri + apiUri,
                headers: headers,
                data: data
            };

            console.log(req);
            $http(req).then(function(response) {
                console.log(response);
                // Retrieve result
                var result = response.data;
                console.log('Api Service Result: ' + result);

                // Resolve promise
                deferred.resolve(result);
            }, function(response) {
                console.log(response);
                console.error("Error - API call went wrong");
                console.error('Error: ' + JSON.stringify(response));
                deferred.reject(response); // Dispatch the failure of the api call
            });

            return deferred.promise;
        },
        'get': function(apiUri) {
            var deferred = $q.defer();
            console.log(headers);
            self.call(apiUri, 'GET', headers, null).then(function(result) {

                deferred.resolve(result);
            }, function(response) {
                console.log(result);
                deferred.reject(response); // RIP
            });

            return deferred.promise;
        },

        'post': function(apiUri, data) {
            var deferred = $q.defer();
            console.log(headers);

            self.call(apiUri, 'POST', headers, data).then(function(result) {
                deferred.resolve(result);
            }, function(response) {
                deferred.reject(response); // RIP
            });

            return deferred.promise;
        },

        'delete': function(apiUri) {
            var deferred = $q.defer();

            self.call(apiUri, 'DELETE', headers, null).then(function(result) {
                deferred.resolve(result);
            }, function(response) {
                deferred.reject(response); // RIP
            });

            return deferred.promise;
        },

        'put': function(apiUri, data) {
            var deferred = $q.defer();

            self.call(apiUri, 'PUT', headers, data).then(function(result) {
                deferred.resolve(result);
            }, function(response) {
                deferred.reject(response); // RIP
            });

            return deferred.promise;
        },
    };

    return self;
});

mod.service('CheckInternet', function($rootScope) {
    var self = {
        'getConnection': function() {
            console.log(typeof(navigator.connection));

            if (typeof(navigator.connection) != 'undefined') {
                console.log("This platform doesn't support online and offline events");

                function start() {
                    if (navigator.connection['type'] == 'none') {
                        onOffline();
                    } else {
                        onOnline();
                    }
                }
                start();

                document.addEventListener("offline", onOffline, false);

                function onOffline() {
                    $rootScope.internet = false;
                console.log("No INternet");

                    return false;
                }

                document.addEventListener("online", onOnline, false);

                function onOnline() {
                    $rootScope.internet = true;
                    console.log("INternet");

                    return true;

                    //updatePlayer();
                }
            } else {
                $rootScope.internet = true;
                console.log("This platform doesn't support online and offline events");

                return true;
                //updatePlayer();
            }
        }
    };
    return self;
});
