'use strict';
var http = require('http');

var options = {
  port: 4000,
  method: 'POST'
};

var server = http.createServer(function(req, res){
  if(req.method === 'POST'){
    var endpointReq = http.request(options, function(endpointRes){
      if(endpointRes.statusCode !== 200){
        res.writeHead(503);
        res.end("Service unavailable");
      } else {
        res.writeHead(200);
        res.end("OK");
      }
    });
    endpointReq.on('error', function(e){
      res.writeHead(500);
      res.end('500');
    });
    endpointReq.end();
  } else {
    res.writeHead(501);
    res.end("Not implemented");
  }
});

server.listen(3000);
