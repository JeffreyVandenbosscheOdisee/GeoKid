var mod = angular.module('GeoKidApp.controllers', []);
var ActivePlayers = [];



// OverviewController
mod.controller('MapOverviewCtrl', function($scope, $rootScope, ApiService, CheckInternet, $cordovaGeolocation, $window, $state, $ionicPlatform) {
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

});

mod.controller('NavCtrl', function($scope, $rootScope, CheckInternet, ApiService, $state, $window) {
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

});

// DetailController
mod.controller('DetailSubaccCtrl', function($scope, $rootScope, CheckInternet, ApiService, $stateParams) {
    CheckInternet.getConnection($rootScope);
    console.log($stateParams.userId);
    masteraccId = window.localStorage['masteraccId'];
    ApiService.get('/account/' + masteraccId + '/subaccounts/' + $stateParams.userId).then(function(result) {
        console.log(result);
        $scope.apiResult = result;
        ApiService.post('/playgrounds/visitedplaygrounds', { masteraccId: result.MasterAccounts_Id }).then(function(result) {
            $scope.apiResultplaygrounds = result;
        });
    });
});

mod.controller('DetailPlayCtrl', function($scope, $rootScope, CheckInternet, ApiService, $stateParams, $ionicPopup, $state) {
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
            ApiService.post('/playgrounds/' + $stateParams.playgroundId + '/visit', { masteraccId: masteraccId }).then(function(result) {
                console.log(result);
            });

        });
    }

    $scope.clickItem = function(task) {
        if (task.checked) {

            ApiService.post('/task/complete', { playgroundId: $stateParams.playgroundId, taskId: task.Id, subaccountsId: ActivePlayers }).then(function(result) {
                console.log(result);
                checkeditems++;
                console.log(checkeditems);
                if (checkeditems == 5) {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Proficiat!',
                        template: 'Je hebt alle opdrachten voltooid',
                        buttons: [{ // Array[Object] (optional). Buttons to place in the popup footer.
                            text: 'Een nieuwe locatie kiezen',
                            type: 'button-positive',
                            onTap: function(e) {
                                // e.preventDefault() will stop the popup from closing when tapped.
                                // e.preventDefault();
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

});


mod.controller('SubAccCtrl', function($scope, $rootScope, ApiService, CheckInternet, $stateParams, $window) {
    CheckInternet.getConnection($rootScope);
    masteraccId = window.localStorage['masteraccId'];
    console.log(masteraccId);
    $scope.ApiUrl = baseUri;
    ApiService.get('/account/' + masteraccId + '/subaccounts').then(function(result) {
        console.log(result);
        $scope.apiResult = result;
    });
    $scope.ChoosePlayer = function(subaccId) {
        console.log();
        index = ActivePlayers.indexOf(subaccId);
        if (index == -1) {
            ActivePlayers.push(subaccId);
        } else {
            ActivePlayers.splice(index, 1);
        }
        console.log("subaccountId", subaccId);
        console.log("ActivePlayers", ActivePlayers);
        window.localStorage['ActivePlayers'] = JSON.stringify(ActivePlayers);

    }
});

mod.controller('LoginCtrl', function($scope, ApiService, CheckInternet, $state, $window, $rootScope) {

    CheckInternet.getConnection($rootScope);
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
            } else if (!regexMail.test(data.email)) {
                showError("Ongeldig email formaat!");
            } else {
                ApiService.post('/auth/login/', { email: data.email, password: data.password }).then(function(result) {
                    // We've got a result
                    console.log(result.succesLogin);
                    if (result.succesLogin) {
                        window.localStorage['masteraccId'] = result.MasteraccountId;
                        $window.location.reload();

                        $state.go('subaccounts');
                    } else {
                        showError('Ongeldige inloggegevens!');
                    }
                });
            }
        } else {
            showError("Email en/of wachtwoord mogen niet leeg zijn!");
        }
    }
});

mod.controller('RegisterCtrl', function($scope, ApiService, $state, $rootScope, CheckInternet) {
    $scope.loginError = '';
    CheckInternet.getConnection($rootScope);

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
            } else if (!regexMail.test(data.email)) {
                showError("Ongeldig email formaat!");
            } else if (!angular.equals(data.password, data.passwordRepeat)) {
                showError("De 2 wachtwoorden zijn niet gelijk aan elkaar!");

            } else {
                ApiService.post('/auth/register/', { email: data.email, password: data.password, familyname: data.familyname, streetnr: data.streetnr, zipcode: data.zipcode, city: data.city }).then(function(result) {
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

mod.controller('DeletesubCtrl', function($rootScope, CheckInternet, $window, $scope, ApiService, $state, $stateParams) {
    CheckInternet.getConnection($rootScope);
    masteraccId = window.localStorage['masteraccId'];
    subaccId = $stateParams.userId;
    ApiService.get('/account/' + masteraccId + '/subaccounts/' + $stateParams.userId + '/delete').then(function(result) {
        // We've got a result
        console.log(result);

        $window.location.reload();
        $state.go('subaccounts');
    });

});


mod.controller('EditsubCtrl', function($window, $scope, $rootScope, CheckInternet, ApiService, $state, $cordovaCapture, $cordovaImagePicker, $ionicActionSheet, Photo, $stateParams) {
    CheckInternet.getConnection($rootScope);
    $scope.loginError = '';
    masteraccId = window.localStorage['masteraccId'];
    subaccId = $stateParams.userId;

    function showError(text) {
        $scope.loginError = text;
    }
    ApiService.get('/account/' + masteraccId + '/subaccounts/' + $stateParams.userId).then(function(result) {
        console.log(result);
        $scope.data = { name: result.Name };
    });

    $scope.create = function(data) {
        if (data != null) {


            ApiService.post('/account/' + masteraccId + '/subaccounts/' + $stateParams.userId + '/change', { name: data.name }).then(function(result) {
                // We've got a result
                console.log(result);
                subaccId = result;
                if ($scope.picData != undefined) {
                    $scope.send();

                }
                // $state.go($state.current, {}, {reload: true});
                $window.location.reload();

                $state.go('subaccounts');
            });

        } else {
            showError("Email en/of wachtwoord mogen niet leeg zijn!");
        }

    }

});
mod.controller('CreateSubCtrl', function($window, $scope, $rootScope, CheckInternet, ApiService, $state, $cordovaCapture, $cordovaImagePicker, $ionicActionSheet, Photo) {
    CheckInternet.getConnection($rootScope);
    $scope.loginError = '';
    masteraccId = window.localStorage['masteraccId'];
    subaccId = null;

    function showError(text) {
        $scope.loginError = text;
    }

    $scope.create = function(data) {
        console.log(data);

        if (data != null) {
            console.log(data.name);
            console.log($scope.formData.photo);
            console.log(($scope.picData != undefined));
            // debugger;


            ApiService.post('/account/' + masteraccId + '/subaccounts/create', { name: data.name }).then(function(result) {
                // We've got a result
                console.log(result);
                subaccId = result;
                if ($scope.picData != undefined) {
                    $scope.send();

                }
                $window.location.reload();
                $state.go('subaccounts');
            });

        } else {
            showError("Email en/of wachtwoord mogen niet leeg zijn!");
        }

    }

    $scope.takePic = function() {
        var options = {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: 1, // 0:Photo Library, 1=Camera, 2=Saved Photo Album
            encodingType: 0 // 0=JPG 1=PNG
        }
        navigator.camera.getPicture(onSuccess, onFail, options);
    }
    var onSuccess = function(FILE_URI) {
        console.log(FILE_URI);
        $scope.picData = FILE_URI;
        $scope.$apply();
    };
    var onFail = function(e) {
        console.log("On fail " + e);
    }
    $scope.send = function() {
        console.log("dssds");
        var myImg = $scope.picData;
        var options = new FileUploadOptions();
        options.fileKey = "post";
        options.chunkedMode = false;
        var params = {};
        // params.user_token = localStorage.getItem('auth_token');
        // params.user_email = localStorage.getItem('email');
        options.params = params;
        var ft = new FileTransfer();

        ft.upload(myImg, encodeURI(baseUri + '/account/' + masteraccId + '/' + subaccId + '/uploadpic'), onUploadSuccess, onUploadFail, options);
    }

    // $scope.data = { "ImageURI": "Select Image" };

    // $scope.takePicture = function() {
    //     var options = {
    //         quality: 50,
    //         destinationType: Camera.DestinationType.FILE_URL,
    //         sourceType: Camera.PictureSourceType.CAMERA
    //     };
    //     $cordovaCamera.getPicture(options).then(
    //         function(imageData) {
    //             $scope.picData = imageData;
    //             $scope.ftLoad = true;
    //             // $localstorage.set('fotoUp', imageData);
    //             // $ionicLoading.show({ template: 'Foto acquisita...', duration: 500 });
    //         },
    //         function(err) {
    //             $ionicLoading.show({ template: 'Error, gelieve opnieuw een foto te maken', duration: 500 });
    //         })
    // }

    // $scope.selectPicture = function() {
    //     var options = {
    //         quality: 50,
    //         destinationType: Camera.DestinationType.FILE_URI,
    //         sourceType: Camera.PictureSourceType.PHOTOLIBRARY
    //     };

    //     $cordovaCamera.getPicture(options).then(
    //         function(imageURI) {
    //             window.resolveLocalFileSystemURI(imageURI, function(fileEntry) {
    //                 $scope.picData = fileEntry.nativeURL;
    //                 $scope.ftLoad = true;
    //                 var image = document.getElementById('myImage');
    //                 image.src = fileEntry.nativeURL;
    //             });
    //             // $ionicLoading.show({ template: 'Foto acquisita...', duration: 500 });
    //         },
    //         function(err) {
    //             $ionicLoading.show({ template: 'Error, gelieve opnieuw te proberen', duration: 500 });
    //         })
    // };

    // $scope.uploadPicture = function() {
    //     $ionicLoading.show({ template: 'Uploaden' });
    //     var fileURL = $scope.picData;
    //     var options = new FileUploadOptions();
    //     options.fileKey = "file";
    //     options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
    //     options.mimeType = "image/jpeg";
    //     options.chunkedMode = true;

    //     var params = {};
    //     params.value1 = "someparams";
    //     params.value2 = "otherparams";

    //     options.params = params;

    //     var ft = new FileTransfer();
    //     ft.upload(fileURL, encodeURI("http://www.yourdomain.com/upload.php"), viewUploadedPictures, function(error) {
    //         $ionicLoading.show({ template: 'Een Error gelieve opnieuw te proberen' });
    //         $ionicLoading.hide();
    //     }, options);
    // }
    // 

    $scope.formData = {};

    // action sheet
    $scope.showAction = function() {

        var hideSheet = $ionicActionSheet.show({
            buttons: [
                { text: ' Capture' },
                { text: ' Pick' }
            ],
            title: 'Add Photo',
            cancelText: 'Cancel',
            cancel: function() {
                //
            },
            buttonClicked: function(index) {
                if (index == 0) {
                    var options = {
                        limit: 1
                    };

                    // capture
                    $cordovaCapture.captureImage(options).then(function(imageData) {
                        var imgData = imageData[0].fullPath;
                        // convert image to base64 string
                        Photo.convertImageToBase64(imgData, function(base64Img) {
                            $scope.formData.photo = base64Img;
                        });
                        console.log($scope.formData.photo);


                    }, function(error) {
                        $scope.photoError = error;
                    });
                } else if (index == 1) {
                    var options = {
                        maximumImagesCount: 1,
                    };

                    // pick
                    $cordovaImagePicker.getPictures(options).then(function(results) {
                        var imgData = results[0];
                        // convert image to base64 string
                        Photo.convertImageToBase64(imgData, function(base64Img) {
                            $scope.formData.photo = base64Img;
                        });
                        console.log($scope.formData.photo);
                    });
                }
            }
        })
    };

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
