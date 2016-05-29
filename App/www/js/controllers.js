var mod = angular.module('GeoKidApp.controllers', []);

// OverviewController
mod.controller('OverviewCtrl', function($scope, ApiService) {
    console.log('overview');
    // ApiService.get('/problems').then(function(result) {
    //     console.log(result);
    //     $scope.apiResult = result;
    // });

    /*
    $scope.doRefresh = function () {
        if(!$scope.apiService.isLoading) {
            console.log('Message - Refresh of the results');
            // Here use the 'then' to handle the promise dispatched by the service
            $scope.apiService.refresh().then(function() {
                $scope.$broadcast('scroll.refreshComplete'); // Otherwise it's keep showing the loading animation
            });
        }
    }

    $scope.loadMore = function () {
        console.log('Message - Load more results, hasMore = ' + $scope.apiService.hasMore);
        if(!$scope.apiService.isLoading) {
            // Here use the 'then' to handle the promise dispatched by the service
            $scope.apiService.next().then(function() {
                $scope.$broadcast('scroll.infiniteScrollComplete');  // Otherwise it's keep showing the loading animation
            });
        }
    }
    */
});

// DetailController
mod.controller('DetailCtrl', function($scope, ApiService, $stateParams) {
    console.log('users/' + $stateParams.userId + '/wishes');
    ApiService.get('users' + $stateParams.userId + '/wishes');

    // Bind to scope
    $scope.apiService = ApiService;

    $scope.doRefresh = function() {
        if (!$scope.apiService.isLoading) {
            console.log('Message - Refresh of the results');
            // Here use the 'then' to handle the promise dispatched by the service
            $scope.apiService.refresh().then(function() {
                $scope.$broadcast('scroll.refreshComplete'); // Otherwise it's keep showing the loading animation
            });
        }
    }

    $scope.loadMore = function() {
        console.log('Message - Load more results, hasMore = ' + $scope.apiService.hasMore);
        if (!$scope.apiService.isLoading) {
            // Here use the 'then' to handle the promise dispatched by the service
            $scope.apiService.next().then(function() {
                $scope.$broadcast('scroll.infiniteScrollComplete'); // Otherwise it's keep showing the loading animation
            });
        }
    }
});

mod.controller('NewCtrl', function($scope, ApiService, $stateParams) {
    $scope.add = function(item) {
        item = { title: item.title, description: item.description };
        console.log(item);
        ApiService.post('/problems', item).then(function() {
            // Perform update

        });
    };
});

mod.controller('LoginCtrl', function($scope, ApiService, $state) {
    $scope.WrongCred = false;

    $scope.loginError = '';

    function showError(text) {
        $scope.loginError = text;
    }

    // Handle login
    $scope.login = function(data) {
        console.log(data);
        var regexMail = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        if (data != null) {
            console.log(data.password);
            if ((data.password) == undefined || (data.email) == undefined) {
                showError("Email en/of wachtwoord mogen niet leeg zijn!");
            }
            else if (!regexMail.test(data.email)) {
                showError("Ongeldig email formaat!");
            } else {
                ApiService.post('/auth/login/', { email: data.email, password: data.password }).then(function(result) {
                    // We've got a result
                    console.log(result.succesLogin);
                    if (result.succesLogin)
                        $state.go('overview');
                    else {
                        showError('Ongeldige inloggegevens!');
                    }
                });
            }
        } else {
            showError("Email en/of wachtwoord mogen niet leeg zijn!");
        }
    }
});

mod.controller('RegisterCtrl', function($scope, ApiService, $state) {
    $scope.loginError = '';

    function showError(text) {
        $scope.loginError = text;
    }

    $scope.register = function(data) {
        console.log(data);
        var regexMail = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

        if (data != null) {
            console.log(data.password);
            console.log(data.passwordRepeat);

             console.log();
            if ((data.password) == undefined || (data.email) == undefined || (data.familyname) == undefined || (data.streetnr) == undefined || (data.zipcode) == undefined || (data.city) == undefined) {
                showError("Email en/of wachtwoord mogen niet leeg zijn!");
            }
            else if (!regexMail.test(data.email)) {
                showError("Ongeldig email formaat!");
            } else if(!angular.equals(data.password, data.passwordRepeat)){
                showError("De 2 wachtwoorden zijn niet gelijk aan elkaar!");

            }
            else {
                ApiService.post('/auth/register/', { email: data.email, password: data.password , familyname: data.familyname, streetnr: data.streetnr, zipcode: data.zipcode, city: data.city}).then(function(result) {
                    // We've got a result
                    console.log(result);
                    // if (result.succesLogin)
                    //     $state.go('overview');
                    // else {
                    //     showError('Ongeldige inloggegevens!');
                    // }
                });
            }
        } else {
            showError("Email en/of wachtwoord mogen niet leeg zijn!");
        }

    }
});
