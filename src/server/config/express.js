'use strict';

var express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    session = require('express-session'),
    path = require('path'),

    dashboardRoutes = require('../routes/dashboard.routes');

module.exports = function(config){

    var app = express();

    // ** Set to use JSON ** //
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());

    // ** Static files ** //
    app.engine('html', require('ejs').renderFile);

    var home = path.join(__dirname, '../..');

    app.set('views', path.join(home, 'client/modules'));

    app.use('/', express.static(path.join(home, "..")));
    app.use('/', express.static(path.join(home, "client")));
    app.use('/', express.static(path.join(home, "client/modules")));
    app.use('/', express.static(path.join(home, "client/assets")));

    // Pages
    app.use(dashboardRoutes(config));

    return app;
};