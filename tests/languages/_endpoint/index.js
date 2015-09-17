'use strict';
var restify = require('restify');
var server = restify.createServer();
var reqTime;
var counter = 0;
server.post('/', function (req, res) {
  counter++;
  var t = Date.now();
  reqTime = t;
  setTimeout(function () {
    res.send(200, 'done');
    if(t === reqTime){
      console.log(counter + " requests served");
    }
  }, 100);
});
server.listen(4000);
console.log('endpoint running on port 4000');
