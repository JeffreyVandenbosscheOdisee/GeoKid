var mod = angular.module('GeoKidApp.controllers', []);
var ActivePlayers = [];

// OverviewController
mod.controller('MapOverviewCtrl', function($scope, ApiService, $cordovaGeolocation) {
    // console.log('overview');
    // var options = { timeout: 10000, enableHighAccuracy: true };
    // $scope.markers = [];

    // var createMarker = function(info) {
    //     var marker = new google.maps.Marker({
    //         position: new google.maps.LatLng(info.Latitude, info.Longitude),
    //         map: $scope.map,
    //         animation: google.maps.Animation.DROP,
    //         title: info.Name
    //     });
    //     $scope.markers.push(marker);
    //     // console.log($scope.markers);
    // }

    // $cordovaGeolocation.getCurrentPosition(options).then(function(position) {

    //     var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    //     var mapOptions = {
    //         center: latLng,
    //         zoom: 15,
    //         mapTypeId: google.maps.MapTypeId.ROADMAP
    //     };

    //     $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

    //     var image = {
    //         url: '../images/markergroup.png',
    //         size: new google.maps.Size(30, 40)

    //     };
    //     var mylocation = new google.maps.Marker({
    //         map: $scope.map,
    //         animation: google.maps.Animation.DROP,
    //         position: latLng,
    //         icon: image
    //     });


    // }, function(error) {
    //     console.log("Could not get location");
    // });

    // ApiService.get('/playgrounds/').then(function(result) {
    //     console.log(result.length);
    //     // result.forEach($scope.placePlayground);
    //     for (i = 0; i < result.length; i++) {
    //         createMarker(result[i]);
    //     }
    //     $scope.apiResult = result;

    // });
    ApiService.get('/playgrounds/').then(function(result) {

        $scope.apiResult = result;
        google.maps.event.addDomListener(document.getElementById("map"), 'load', $scope.initialise());

    });
    $scope.initialise = function() {

        $scope.playgroundactive = false;

        var myLatlng = new google.maps.LatLng(37.3000, -120.4833);
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
            marker.content = '<div class="infoWindowContent">' + info.Name + '</div>';

            google.maps.event.addListener(marker, 'click', function() {
                var currentMarker = Map.currentMarker || false;
                ApiService.get('/playgrounds/' + info.Id).then(function(result) {
                    $scope.playgroundInfo = result;
                    $scope.playgroundactive = true;

                    console.log(result);
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

});

// DetailController
mod.controller('DetailSubaccCtrl', function($scope, ApiService, $stateParams) {
    console.log($stateParams.userId);
    masteraccId = 3;
    ApiService.get('/account/' + masteraccId + '/subaccounts/' + $stateParams.userId).then(function(result) {
        console.log(result);
        $scope.apiResult = result;
        ApiService.post('/playgrounds/visitedplaygrounds', { masteraccId: result.MasterAccounts_Id }).then(function(result) {
            $scope.apiResultplaygrounds = result;
        });
    });
});

mod.controller('SubAccCtrl', function($scope, ApiService, $stateParams, $window) {

    masteraccId = 3;
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


    }
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
            } else if (!regexMail.test(data.email)) {
                showError("Ongeldig email formaat!");
            } else {
                ApiService.post('/auth/login/', { email: data.email, password: data.password }).then(function(result) {
                    // We've got a result
                    console.log(result.succesLogin);
                    if (result.succesLogin)
                        $state.go('subaccounts');
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

mod.controller('DeletesubCtrl', function($window, $scope, ApiService, $state, $stateParams) {
    masteraccId = 3;
    subaccId = $stateParams.userId;
    ApiService.get('/account/' + masteraccId + '/subaccounts/' + $stateParams.userId + '/delete').then(function(result) {
        // We've got a result
        console.log(result);

        $window.location.reload();
        $state.go('subaccounts');
    });

});


mod.controller('EditsubCtrl', function($window, $scope, ApiService, $state, $cordovaCapture, $cordovaImagePicker, $ionicActionSheet, Photo, $stateParams) {
    $scope.loginError = '';
    masteraccId = 3;
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

})
mod.controller('CreateSubCtrl', function($window, $scope, ApiService, $state, $cordovaCapture, $cordovaImagePicker, $ionicActionSheet, Photo) {
    $scope.loginError = '';
    masteraccId = 3;
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

})

// factory
.factory('Photo', function() {
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
