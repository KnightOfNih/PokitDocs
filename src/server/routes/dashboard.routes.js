'use strict';

var express = require('express'),
    request = require('request'),
    async = require('async');

module.exports = function (config) {

    var router = express.Router(),

        // Would be better to abstract out as a service
        url = 'https://openpaymentsdata.cms.gov/resource/gmj8-2w4s.json?$select=count(*)&$where=physician_profile_state=';

    router.get('/', function (req, res) {
        res.render('layout/layout.html');
    });

    router.get('/physician', function (req, res) {

        var stateMap = [],
            states = ['AL',
                'AK',
                'AZ',
                'AR',
                'CA',
                'CO',
                'CT',
                'DE',
                'FL',
                'GA',
                'HI',
                'ID',
                'IL',
                'IN',
                'IA',
                'KS',
                'KY',
                'LA',
                'ME',
                'MD',
                'MA',
                'MI',
                'MN',
                'MS',
                'MO',
                'MT',
                'NE',
                'NV',
                'NH',
                'NJ',
                'NM',
                'NY',
                'NC',
                'ND',
                'OH',
                'OK',
                'OR',
                'PA',
                'RI',
                'SC',
                'SD',
                'TN',
                'TX',
                'UT',
                'VT',
                'VA',
                'WA',
                'WV',
                'WI',
                'WY'];


        function keyConverter(state) {
            return "us-" + state.toLowerCase();
        }

        var asyncTasks = [];
        states.forEach(function (state) {
            asyncTasks.push(function (callback) {
                var path = url + "'" + state + "'";
                request(path, function (error, response, body) {
                    body = JSON.parse(body);
                    if (body instanceof Array && body.length > 0) {
                        stateMap.push({"hc-key": keyConverter(state), "value": Number(body[0].count)});
                    } else {
                        stateMap.push({"hc-key": keyConverter(state), "value": 0});
                    }
                    callback();
                });
            });
        });

        async.parallel(asyncTasks, function () {
            res.json(stateMap);
        });

    });

    router.get('/physician/:id', function (req, res) {
        console.log('id route');
    });

    return router;
};