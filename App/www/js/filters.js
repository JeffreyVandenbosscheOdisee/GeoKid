// Just as an example to write your own filter
var mod = angular.module('GeoKidApp.filters', []);

// same as a module but here we refer to filter
// remark: if you want to add a directive, here you refer to directive...
mod.filter('address', function () {
    return function (arr, seperator) {
        return arr.join(seperator);
    };
});