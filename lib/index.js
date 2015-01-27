'use strict';

var restify = require('restify');
var argv = require('minimist')(process.argv.slice(2));
var fs = require('fs');
var path = require('path');
var apiPut = require('./api/put');
var apiAggregate = require('./api/aggregate');

if(!argv.cert || !argv.key || !argv.apikey){
    throw new Error('Missing arguments! Be sure to add --cert, --key and --apikey parameters with associating file paths.');
}

var cert = fs.readFileSync(argv.cert, {encoding: 'utf8'});
var key = fs.readFileSync(argv.key, {encoding: 'utf8'});
var apikey = fs.readFileSync(argv.apikey, {encoding: 'utf8'});

var server = restify.createServer({
    certificate: cert,
    key: key,
    name: 'RelayServerGCM'
});

server.listen(8080);

server.put('/p/:id', apiPut.handler);
server.put('/a', apiAggregate.handler);