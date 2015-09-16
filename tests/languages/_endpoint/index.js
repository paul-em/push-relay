'use strict';
var restify = require('restify');
var server = restify.createServer();
server.post('/', function (req, res) {
  console.log('incoming request');
  setTimeout(function () {
    res.send(200, 'done');
  }, 100);
});
server.listen(3001);
console.log('endpoint running on port 3001');