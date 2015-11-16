// Set the 'NODE_ENV' variable
var env = process.env.NODE_ENV || 'dev';

// Load the proper configuration files
var config = require('./server/config/env/' + env + '.js');

// Configure the base express instance
var app = require('./server/config/express')(config);

// Start accepting requests
app.listen(config.getPort());

console.log("listening @ " + config.getDomain());

