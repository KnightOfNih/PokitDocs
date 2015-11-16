(function () {

    angular
        .module('app.master-data')
        .controller('MasterDataCtrl', MasterDataCtrl);

    MasterDataCtrl.$inject = ['$scope', '$http', 'physicianService', 'Highcharts'];

    function MasterDataCtrl($scope, $http, physicianService, Highcharts) {

    }
})();