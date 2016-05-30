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

mod.controller('SubAccCtrl', function($scope, ApiService, $stateParams) {
    masteraccId = 3;
    $scope.ApiUrl = baseUri;
    ApiService.get('/account/' + masteraccId + '/subaccounts').then(function(result) {
        console.log(result);
        $scope.apiResult = result;
    });
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

mod.controller('DeletesubCtrl', function($scope, ApiService, $state, $stateParams) {
    masteraccId = 3;
    subaccId = $stateParams.userId;
    ApiService.get('/account/' + masteraccId + '/subaccounts/' + $stateParams.userId + '/delete').then(function(result) {
        // We've got a result
        console.log(result);
       

        $state.go('subaccounts');
    });

});


mod.controller('EditsubCtrl', function($scope, ApiService, $state, $cordovaCapture, $cordovaImagePicker, $ionicActionSheet, Photo, $stateParams) {
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

                $state.go('subaccounts');
            });

        } else {
            showError("Email en/of wachtwoord mogen niet leeg zijn!");
        }

    }

})
mod.controller('CreateSubCtrl', function($scope, ApiService, $state, $cordovaCapture, $cordovaImagePicker, $ionicActionSheet, Photo) {
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
