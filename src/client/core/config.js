(function() {
    'use strict';

    angular.module('app.core')
        .config(function ($routeProvider, $httpProvider) {


            $routeProvider

                // route for the home page
                .when('/', {
                    templateUrl: '../modules/master-data/items.html',
                    controller: 'MasterDataCtrl'
                })

    })
})();
