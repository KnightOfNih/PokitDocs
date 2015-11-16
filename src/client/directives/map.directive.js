(function() {
    'use strict';

    angular
        .module('app.directives')
        .directive('map', ['physicianService', historyChart]);

    /* @ngInject */
    function historyChart (physicianService) {

        var directive = {
            link: link,
            scope: {},
            restrict: 'E',
            replace: true,
            template: '<div id="container"></div>'
        };

        return directive;

        function link(scope, element, attrs) {

            var service;

            switch(attrs['service']){
                case 'physician' : service = physicianService; break;
                default: console.log("Incorrect service parameter!");
            }

            service.read()
                .then(function(data){

                    // Initiate the chart
                    var chartOptions = {
                        chart: {
                            renderTo: 'container'
                        },

                        title : {
                            text : 'Physicians Per State'
                        },

                        subtitle : {
                            text : 'United States of America'
                        },

                        mapNavigation: {
                            enabled: true,
                            buttonOptions: {
                                verticalAlign: 'bottom'
                            }
                        },

                        // For the life of me, I can't get the numbers to format
                        //lang: {
                        //    thousandsSep: ','
                        //},
                        //
                        //tooltip: {
                        //    pointFormat: '&nbsp;&nbsp;&nbsp;<b>{point.value:,.0f}</b>',
                        //    shared: true
                        //},

                        colorAxis: {
                            min: 0,
                            max: 75000
                        },

                        series : [{
                            data : data,
                            mapData: Highcharts.maps['countries/us/us-all'],
                            joinBy: 'hc-key',
                            name: '# of Physicians',
                            states: {
                                hover: {
                                    color: '#BADA55'
                                }
                            },
                            dataLabels: {
                                enabled: true,
                                format: '{point.name}'
                            }
                        }, {
                            name: 'Separators',
                            type: 'mapline',
                            data: Highcharts.geojson(Highcharts.maps['countries/us/us-all'], 'mapline'),
                            color: 'silver',
                            showInLegend: false,
                            enableMouseTracking: false
                        }]
                    };

                    scope.chart = new Highcharts.Map(chartOptions);
                });
        }
    }
})();
