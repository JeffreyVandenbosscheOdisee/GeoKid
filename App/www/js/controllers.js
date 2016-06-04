var mod = angular.module('GeoKidApp.controllers', []);
var ActivePlayers = [];



// OverviewController
mod.controller('MapOverviewCtrl', function($scope, $rootScope, ApiService, CheckInternet, $cordovaGeolocation, $window, $state, $ionicPlatform) {
    if (window.localStorage['masteraccId'] == null) {
        $state.go('login');

    } else {
        $rootScope.login = false;
        
        // $ionicPlatform.ready(function() {
        CheckInternet.getConnection($rootScope);

        // });
        ApiService.get('/playgrounds/').then(function(result) {

            $scope.apiResult = result;
            google.maps.event.addDomListener(document.getElementById("map"), 'load', $scope.initialise());

        });
        $scope.initialise = function() {

            $scope.playgroundactive = false;

            var myLatlng = new google.maps.LatLng(51.05460, 3.72178);

            var mapOptions = {
                center: myLatlng,
                zoom: 14,
                disableDefaultUI: true,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                styles: [{ "featureType": "water", "elementType": "all", "stylers": [{ "hue": "#7fc8ed" }, { "saturation": 55 }, { "lightness": -6 }, { "visibility": "on" }] }, { "featureType": "water", "elementType": "labels", "stylers": [{ "hue": "#7fc8ed" }, { "saturation": 55 }, { "lightness": -6 }, { "visibility": "off" }] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "hue": "#83cead" }, { "saturation": 1 }, { "lightness": -15 }, { "visibility": "on" }] }, { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "hue": "#f3f4f4" }, { "saturation": -84 }, { "lightness": 59 }, { "visibility": "on" }] }, { "featureType": "landscape", "elementType": "labels", "stylers": [{ "hue": "#ffffff" }, { "saturation": -100 }, { "lightness": 100 }, { "visibility": "off" }] }, { "featureType": "road", "elementType": "geometry", "stylers": [{ "hue": "#ffffff" }, { "saturation": -100 }, { "lightness": 100 }, { "visibility": "on" }] }, { "featureType": "road", "elementType": "labels", "stylers": [{ "hue": "#bbbbbb" }, { "saturation": -100 }, { "lightness": 26 }, { "visibility": "on" }] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "hue": "#ffcc00" }, { "saturation": 100 }, { "lightness": -35 }, { "visibility": "simplified" }] }, { "featureType": "road.highway", "elementType": "geometry", "stylers": [{ "hue": "#ffcc00" }, { "saturation": 100 }, { "lightness": -22 }, { "visibility": "on" }] }, { "featureType": "poi.school", "elementType": "all", "stylers": [{ "hue": "#d7e4e4" }, { "saturation": -60 }, { "lightness": 23 }, { "visibility": "on" }] }]
            };
            var map = new google.maps.Map(document.getElementById("map"), mapOptions);
            // Geo Location /
            navigator.geolocation.getCurrentPosition(function(pos) {
                map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));

                var image = {
                    url: 'images/markergroup.png',
                    size: new google.maps.Size(30, 40)

                };
                var myLocation = new google.maps.Marker({
                    position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
                    map: map,
                    animation: google.maps.Animation.DROP,
                    title: "My Location",
                    icon: image
                });

            });
            $scope.map = map;
            // Additional Markers //
            $scope.markers = [];
            var infoWindow = new google.maps.InfoWindow();
            var createMarker = function(info) {
                var image = {
                    url: 'images/pin.png',
                    size: new google.maps.Size(32, 40)

                };
                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(info.Latitude, info.Longitude),
                    map: $scope.map,
                    // animation: google.maps.Animation.DROP,
                    title: info.Name,
                    icon: image
                });


                google.maps.event.addListener(marker, 'click', function() {
                    var currentMarker = Map.currentMarker || false;
                    ApiService.get('/playgrounds/' + info.Id).then(function(result) {
                        $scope.playgroundInfo = result;
                        $scope.playgroundactive = true;
                        console.log(result);
                        window.localStorage['playground'] = JSON.stringify(result);


                        console.log(result.Longitude);
                    });
                    if (currentMarker != false) {
                        currentMarker.setIcon('images/pin.png');
                    }
                    marker.setIcon('images/pinactive.png');
                    // map.setCenter(marker.getPosition());
                    Map.currentMarker = marker;
                });
                $scope.markers.push(marker);
            }
            for (i = 0; i < $scope.apiResult.length; i++) {
                createMarker($scope.apiResult[i]);
            }
        };

        $scope.gotoNav = function() {
            $state.go('navigation');

            $window.location.reload();

        }
        $scope.gotosub = function() {

            $state.go('subaccounts');
        }


    }
});

mod.controller('NavCtrl', function($scope, $rootScope, CheckInternet, ApiService, $state, $window) {
    if (window.localStorage['masteraccId'] == null) {
        $state.go('login');

    } else {
        $rootScope.login = false;

        CheckInternet.getConnection($rootScope);
        var playground = JSON.parse(window.localStorage['playground']);
        console.log(playground);
        var id, target, options;

        $scope.initialise = function() {

            var myLatlng = new google.maps.LatLng(51.05460, 3.72178);

            var mapOptions = {
                center: myLatlng,
                zoom: 17,
                disableDefaultUI: true,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                styles: [{ "featureType": "water", "elementType": "all", "stylers": [{ "hue": "#7fc8ed" }, { "saturation": 55 }, { "lightness": -6 }, { "visibility": "on" }] }, { "featureType": "water", "elementType": "labels", "stylers": [{ "hue": "#7fc8ed" }, { "saturation": 55 }, { "lightness": -6 }, { "visibility": "off" }] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "hue": "#83cead" }, { "saturation": 1 }, { "lightness": -15 }, { "visibility": "on" }] }, { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "hue": "#f3f4f4" }, { "saturation": -84 }, { "lightness": 59 }, { "visibility": "on" }] }, { "featureType": "landscape", "elementType": "labels", "stylers": [{ "hue": "#ffffff" }, { "saturation": -100 }, { "lightness": 100 }, { "visibility": "off" }] }, { "featureType": "road", "elementType": "geometry", "stylers": [{ "hue": "#ffffff" }, { "saturation": -100 }, { "lightness": 100 }, { "visibility": "on" }] }, { "featureType": "road", "elementType": "labels", "stylers": [{ "hue": "#bbbbbb" }, { "saturation": -100 }, { "lightness": 26 }, { "visibility": "on" }] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "hue": "#ffcc00" }, { "saturation": 100 }, { "lightness": -35 }, { "visibility": "simplified" }] }, { "featureType": "road.highway", "elementType": "geometry", "stylers": [{ "hue": "#ffcc00" }, { "saturation": 100 }, { "lightness": -22 }, { "visibility": "on" }] }, { "featureType": "poi.school", "elementType": "all", "stylers": [{ "hue": "#d7e4e4" }, { "saturation": -60 }, { "lightness": 23 }, { "visibility": "on" }] }]
            };

            var map = new google.maps.Map(document.getElementById("map"), mapOptions);
            google.maps.event.addListenerOnce(map, 'idle', function() {
                $scope.map = map;

                loadMarkers();
                // enableMap();
            });


        };
        var loadMarkers = function() {

            navigator.geolocation.getCurrentPosition(function(pos) {
                $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));

                var markerpos = null;
                var image = {
                    url: 'images/markergroup.png',
                    size: new google.maps.Size(30, 40)

                };
                var markerpos = new google.maps.Marker({
                    position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
                    map: $scope.map,
                    // animation: google.maps.Animation.DROP,
                    title: "My Location",
                    icon: image
                });



                function success(pos) {

                    var crd = pos.coords;
                    console.log(crd);
                    console.log(playground.Latitude, playground.Longitude);
                    var image = {
                        url: 'images/markergroup.png',
                        size: new google.maps.Size(30, 40)

                    };

                    if (markerpos == null) {
                        $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
                        markerpos = new google.maps.Marker({
                            position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
                            icon: image,
                            map: $scope.map,
                            title: 'Click to zoom'
                        });
                    } else {
                        markerpos.setPosition(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
                        $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
                    }

                    if (parseFloat(playground.Latitude) === crd.latitude && parseFloat(playground.Longitude) === crd.longitude) {
                        console.log('Congratulations, you reached the target');
                        navigator.geolocation.clearWatch(id);
                        console
                        $state.go('detailplayground', { playgroundId: playground.Id });
                    }
                }

                function error(err) {
                    console.warn('ERROR(' + err.code + '): ' + err.message);
                }


                options = {
                    enableHighAccuracy: false,
                    timeout: 5000,
                    maximumAge: 0
                };
                id = navigator.geolocation.watchPosition(success, error, options);
            });
            var image = {
                url: 'images/pin.png',
                size: new google.maps.Size(32, 40)

            };
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(playground.Latitude, playground.Longitude),
                map: $scope.map,
                // animation: google.maps.Animation.DROP,
                title: "Destination",
                icon: image
            });
        };

        $scope.gotoMap = function() {
            navigator.geolocation.clearWatch(id);
            $state.go('mapoverview');

            $window.location.reload();

        }
        google.maps.event.addDomListener(document.getElementById("map"), 'load', $scope.initialise());
    }
});

// DetailController
mod.controller('DetailSubaccCtrl', function($scope, $rootScope, CheckInternet, ApiService, $stateParams, $ionicPopup, $ionicLoading, $window) {
    if (window.localStorage['masteraccId'] == null) {
        $state.go('login');

    } else {
        $rootScope.login = false;

        CheckInternet.getConnection($rootScope);
        console.log($stateParams.userId);
        $scope.ApiUrl = baseUri;

        masteraccId = window.localStorage['masteraccId'];
        ApiService.get('/account/' + masteraccId + '/subaccounts/' + $stateParams.userId).then(function(result) {
            console.log(result);
            $scope.apiResult = result;
            ApiService.post('/playgrounds/visitedplaygrounds', { subaccountsId: $stateParams.userId }).then(function(result) {
                $scope.apiResultplaygrounds = result;
            });
            ApiService.post('/achievements/get', { subaccountId: $stateParams.userId }).then(function(result) {
                $scope.apiResultachievement = result;
            });
        });
        $scope.DeleteUser = function(userid) {
            var confirmPopup = $ionicPopup.confirm({
                title: 'Gebruiker verwijderen',
                template: 'Bent u zeker dat u deze gebruiker wilt verwijderen?',
                buttons: [{
                    text: 'Annuleren'
                }, {
                    text: '<b>Verwijderen</b>',
                    type: 'button-positive',
                    onTap: function(e) {
                        $ionicLoading.show({
                            template: 'Verwijderen...'
                        });
                        CheckInternet.getConnection($rootScope);
                        masteraccId = window.localStorage['masteraccId'];
                        // subaccId = $stateParams.userId;
                        subaccId = userid;
                        ApiService.get('/account/' + masteraccId + '/subaccounts/' + $stateParams.userId + '/delete').then(function(result) {
                            // We've got a result
                            console.log(result);
                            $ionicLoading.hide();
                            $window.location.reload();
                            $state.go('subaccounts');
                        });
                    }
                }]
            });
        }
    }
});

mod.controller('DetailPlayCtrl', function($scope, $rootScope, CheckInternet, ApiService, $stateParams, $ionicPopup, $state) {
    if (window.localStorage['masteraccId'] == null) {
        $state.go('login');

    } else {
        $rootScope.login = false;

        var internet = CheckInternet.getConnection($rootScope);
        console.log($stateParams);
        var checkeditems = 0;
        var ActivePlayers = JSON.parse(window.localStorage['ActivePlayers']);
        console.log(ActivePlayers);
        $scope.ApiUrl = baseUri;

        var getPlayground = function() {
            masteraccId = window.localStorage['masteraccId'];
            ApiService.get('/playgrounds/' + $stateParams.playgroundId + '/tasks').then(function(result) {
                console.log(result);
                $scope.playground = result;
                ApiService.post('/playgrounds/' + $stateParams.playgroundId + '/visit', { subaccountsId: ActivePlayers }).then(function(result) {
                    console.log(result);
                    //Checken nieuwe achievements
                    for (var i = 0; i <= ActivePlayers.length; i++) {
                        ApiService.post('/achievements/check', { subaccountsId: ActivePlayers[i], type: "Playgrounds" }).then(function(result) {
                            console.log(result);
                            if (result != false) {
                                var alertPopup = $ionicPopup.alert({
                                    title: 'Proficiat ' + result.NameUser + ', je hebt een achievement gewonnen!',
                                    // template: 'Je hebt de achievement "' + result.Name  + '"" vrijgespeeld',
                                    template: '<div><img src="' + baseUri + result.photo.url + '">This is the right format</div>',
                                    buttons: [{
                                        text: 'Ok',
                                        type: 'button-positive',
                                        onTap: function(e) {

                                        }
                                    }]
                                });

                            }
                        });
                    }


                });

            });
        }

        $scope.clickItem = function(task) {
            if (task.checked) {

                ApiService.post('/task/complete', { playgroundId: $stateParams.playgroundId, taskId: task.Id, subaccountsId: ActivePlayers }).then(function(result) {
                    console.log(result);
                    checkeditems++;
                    console.log(checkeditems);
                    for (var i = 0; i <= ActivePlayers.length; i++) {
                        ApiService.post('/achievements/check', { subaccountsId: ActivePlayers[i], type: "Tasks" }).then(function(result) {
                            console.log(result);
                            if (result != false) {
                                var alertPopup = $ionicPopup.alert({
                                    title: 'Proficiat ' + result.NameUser + ', je hebt een achievement gewonnen!',
                                    // template: 'Je hebt de achievement "' + result.Name  + '"" vrijgespeeld',
                                    template: '<div><img src="' + baseUri + result.photo.url + '"></div>',
                                    buttons: [{
                                        text: 'Ok',
                                        type: 'button-positive',
                                        onTap: function(e) {

                                        }
                                    }]
                                });

                            }
                        });
                    }
                    if (checkeditems == 5) {
                        var alertPopup = $ionicPopup.alert({
                            title: 'Proficiat!',
                            template: 'Je hebt alle opdrachten voltooid',
                            buttons: [{
                                text: 'Een nieuwe locatie kiezen',
                                type: 'button-positive',
                                onTap: function(e) {
                                    $state.go('mapoverview');
                                }
                            }]
                        });
                    }
                });
            } else {
                ApiService.post('/task/uncomplete', { playgroundId: $stateParams.playgroundId, taskId: task.Id, subaccountsId: ActivePlayers }).then(function(result) {
                    console.log(result);
                    checkeditems--;
                    console.log(checkeditems);

                });
            }
        }
        if (internet)
            getPlayground();
    }
});


mod.controller('SubAccCtrl', function($document, $state, $scope, $rootScope, ApiService, CheckInternet, $stateParams, $window, $ImageCacheFactory) {
    if (window.localStorage['masteraccId'] == null) {
        $state.go('login');

    } else {
        $rootScope.login = false;

        localStorage.removeItem("ActivePlayers");
        $scope.Start = false;

        CheckInternet.getConnection($rootScope);
        masteraccId = window.localStorage['masteraccId'];
        $scope.ApiUrl = baseUri;
        ApiService.get('/account/' + masteraccId + '/subaccounts').then(function(result) {
            console.log(result);
            $scope.apiResult = result;
            for (var i = 0; i < result.length; i++) {
                if (result[i].photo != null) {
                    console.log(result[i]);
                    photourl = baseUri + result[i].photo.url;
                    $ImageCacheFactory.Cache([
                        photourl
                    ]).then(function() {
                        console.log("Images done loading!");
                    }, function(failed) {
                        console.log("An image failed: " + failed);
                    });
                }
            }
        });
        $scope.ChoosePlayer = function(subaccId) {
            console.log();
            index = ActivePlayers.indexOf(subaccId);
            if (index == -1) {
                ActivePlayers.push(subaccId);
                var result = document.getElementById(subaccId);
                console.log(result);
                var wrappedResult = angular.element(result);
                wrappedResult.addClass('active');
            } else {
                ActivePlayers.splice(index, 1);
                var result = document.getElementById(subaccId);
                var wrappedResult = angular.element(result);
                wrappedResult.removeClass('active');
            }
            if (ActivePlayers.length > 0) {
                $scope.Start = true;
            } else {
                $scope.Start = false;

            }
            console.log(ActivePlayers.length);

            console.log("subaccountId", subaccId);
            console.log("ActivePlayers", ActivePlayers);
            window.localStorage['ActivePlayers'] = JSON.stringify(ActivePlayers);

        }
    }
});

mod.controller('LoginCtrl', function($ionicLoading, $scope, ApiService, CheckInternet, $state, $window, $rootScope) {
    $rootScope.login = true;
    console.log(window.localStorage['masteraccId']);
    if (window.localStorage['masteraccId'] != null) {
        $state.go('subaccounts');

    } else {
        CheckInternet.getConnection($rootScope);
        $scope.loginError = '';

        function showError(text) {
            $scope.loginError = text;
        }

        // Handle login
            $scope.login = function(data) {
            $ionicLoading.show({
                template: 'Inloggen...'
            });
            console.log(data);
            var regexMail = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
            if (data != null) {
                console.log(data.password);
                if ((data.password) == undefined || (data.email) == undefined) {
                    $ionicLoading.hide();
                    showError("Email en/of wachtwoord mogen niet leeg zijn!");
                } else if (!regexMail.test(data.email)) {
                    $ionicLoading.hide();
                    showError("Ongeldig email formaat!");
                } else {
                    ApiService.post('/auth/login/', { email: data.email, password: data.password }).then(function(result) {
                        // We've got a result
                        console.log(result.succesLogin);
                        if (result.succesLogin) {
                            window.localStorage['masteraccId'] = result.MasteraccountId;
                            $rootScope.login = false;
                            $window.location.reload();

                            $state.go('subaccounts');
                        } else {
                            $ionicLoading.hide();
                            showError('Ongeldige inloggegevens!');
                        }
                    });
                }
            } else {
                $ionicLoading.hide();

                showError("Email en/of wachtwoord mogen niet leeg zijn!");
            }
        }
    }

});
mod.controller('LogoutCtrl', function($scope, $window, $state, $ionicLoading) {
    $ionicLoading.show({
        template: 'Uitloggen...'
    });
    console.log("logout");
    window.localStorage.clear();
    // window.rem
    $window.location.reload();
    $ionicLoading.hide();
    $state.go('login');

});
mod.controller('RegisterCtrl', function($ionicLoading, $scope, ApiService, $state, $rootScope, CheckInternet) {

    $rootScope.login = true;
    CheckInternet.getConnection($rootScope);

    $scope.register = function(data) {
        $ionicLoading.show({
            template: 'Registreren...'
        });
        // console.log(data);

        ApiService.post('/auth/register/', { email: data.email, password: data.password, familyname: data.familyname, streetnr: data.streetnr, zipcode: data.zipcode, city: data.city }).then(function(result) {
            if (result == false) {
                $scope.loginError = true;
                $ionicLoading.hide();

            } else {
                window.localStorage['masteraccId'] = result;
                $ionicLoading.hide();

                $state.go('subaccounts');
            }
            console.log(result);

        });
    }
});



mod.controller('EditsubCtrl', function($ionicLoading, $window, $scope, $rootScope, CheckInternet, ApiService, $state, $cordovaCapture, $cordovaImagePicker, $ionicActionSheet, Photo, $stateParams) {
    if (window.localStorage['masteraccId'] == null) {
        $state.go('login');

    } else {
        $rootScope.login = false;
        $scope.buttonText = "Aanpassen";

        CheckInternet.getConnection($rootScope);
        masteraccId = window.localStorage['masteraccId'];
        subaccId = $stateParams.userId;


        ApiService.get('/account/' + masteraccId + '/subaccounts/' + $stateParams.userId).then(function(result) {
            console.log(result);
            $scope.data = { name: result.Name };
            if (result.photo != null)
                $scope.photoUrl = baseUri + result.photo.url;
            $scope.Title = "Subaccount: " + result.Name + " aanpassen";
        });

        $scope.create = function(data) {
            $ionicLoading.show({
                template: 'Aanpassen...'
            });


            ApiService.post('/account/' + masteraccId + '/subaccounts/' + $stateParams.userId + '/change', { name: data.name }).then(function(result) {
                // We've got a result
                console.log(result);
                // subaccId = result;
                if (imgPath != null) {
                    $scope.uploadPhoto();

                }
                $ionicLoading.hide();
                // $state.go($state.current, {}, {reload: true});
                $window.location.reload();

                $state.go('subaccounts');
            });

        }

        $scope.takePhoto = function() {
            navigator.camera.getPicture(function(imgData) {
                imgPath = imgData;
                //show after users capture photo
                document.getElementById("image-preview").src = imgData;
                // document.getElementById("upload-btn").style.display = "block";
                document.getElementById("image-preview").style.display = "block";
                // document.getElementById("description").style.display = "block";
            }, function(error) {
                alert(error);
            }, {
                quality: 90,
                destinationType: Camera.DestinationType.FILE_URI,
                correctOrientation: true
            });
        };
        $scope.uploadPhoto = function() {
            var options = new FileUploadOptions();
            options.fileKey = "photo";
            options.fileName = imgPath;
            options.mimeType = "image/jpeg";
            options.params = {
                subaccId: subaccId
                    // description: document.getElementById("description").value
            };

            //set file transfer
            var fileTransfer = new FileTransfer();
            //show loading bar when upload on progress


            var destinationUrl = "http://api.jeffreyvdb.be/account/10/subaccounts/uploadpic";

            //upload file
            fileTransfer.upload(imgPath, destinationUrl, function(response) {
                //on success
                alert(response.response);
            }, function(error) {
                //on failed
                alert("An error has occured: Code=" + error.code);
            }, options);
        }
    }
});
mod.controller('CreateSubCtrl', function($ionicLoading, $window, $scope, $rootScope, CheckInternet, ApiService, $state, $cordovaCapture, $cordovaImagePicker, $ionicActionSheet, Photo) {
    if (window.localStorage['masteraccId'] == null) {
        $state.go('login');

    } else {
        $rootScope.login = false;

        var imgPath = null;
        CheckInternet.getConnection($rootScope);
        $scope.buttonText = "Aanmaken";
        $scope.Title = "Nieuw subaccount aanmaken";
        masteraccId = window.localStorage['masteraccId'];
        subaccId = null;


        $scope.takePhoto = function() {
            navigator.camera.getPicture(function(imgData) {
                imgPath = imgData;
                //show after users capture photo
                document.getElementById("image-preview").src = imgData;
                // document.getElementById("upload-btn").style.display = "block";
                document.getElementById("image-preview").style.display = "block";
                // document.getElementById("description").style.display = "block";
            }, function(error) {
                alert(error);
            }, {
                quality: 90,
                destinationType: Camera.DestinationType.FILE_URI,
                correctOrientation: true
            });
        };
        $scope.create = function(data) {
            console.log(data);
            $ionicLoading.show({
                template: 'Creëren...'
            });

            // debugger;


            ApiService.post('/account/' + masteraccId + '/subaccounts/create', { name: data.name }).then(function(result) {
                // We've got a result
                console.log(result);
                subaccId = result;
                if (imgPath != null) {
                    $scope.uploadPhoto();

                }
                $ionicLoading.hide();
                $window.location.reload();
                $state.go('subaccounts');
            });



        };
        $scope.uploadPhoto = function() {
            var options = new FileUploadOptions();
            options.fileKey = "photo";
            options.fileName = imgPath;
            options.mimeType = "image/jpeg";
            options.params = {
                subaccId: subaccId
                    // description: document.getElementById("description").value
            };

            //set file transfer
            var fileTransfer = new FileTransfer();
            //show loading bar when upload on progress


            var destinationUrl = "http://api.jeffreyvdb.be/account/10/subaccounts/uploadpic";

            //upload file
            fileTransfer.upload(imgPath, destinationUrl, function(response) {
                //on success
                alert(response.response);
            }, function(error) {
                //on failed
                alert("An error has occured: Code=" + error.code);
            }, options);
        }
    }
});

// factory
mod.factory('Photo', function() {
    return {

        convertImageToBase64: function(url, callback, output) {
            var img = new Image();
            img.crossOrigin = 'Anonymous';
            img.onload = function() {
                var canvas = document.createElement('CANVAS'),
                    c = canvas.getContext('2d'),
                    urlData;
                canvas.height = this.height;
                canvas.width = this.width;
                c.drawImage(this, 0, 0);
                urlData = canvas.toDataURL(output);
                callback(urlData);
                canvas = null;
            };
            img.src = url;
        }

    };


});
