'use strict';
var http = require('http');

var options = {
  port: 3001,
  method: 'POST'
};

var server = http.createServer(function(req, res){
  if(req.method === 'POST'){
    var endpointReq = http.request(options, function(endpointRes){
      res.writeHead(200);
      res.end(endpointRes.statusCode + '');
    });
    endpointReq.on('error', function(e){
      res.writeHead(200);
      res.end('500');
    });
    endpointReq.end();
  } else {
    res.writeHead(501);
    res.end("Not implemented");
  }
});

server.listen(3000);
