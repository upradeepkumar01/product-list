/**
 * @fileName - proxy.js
 * Proxy the server on a port
 */
 
var server = require('./server.js'),
    port = 8002;

console.log('Trying to boot on ' + port);

server.boot(port);

console.log('Booted...');
