// Transpile ES6 to ES5
require('babel/register');

var chalk = require('chalk');

// Returns a promise from ./db/index.js
var port = (process.env.PORT || 4545);
var server = require('http').createServer();
var app;

// Start the server
app = require('./app');
server.on('request', app);
require('./io')(server);
server.listen(port, function() {
    console.log('The server is listening on port', chalk.green.bold(port), 'and loves you very much.');
    });
