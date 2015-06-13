var https = require('https');
var fs = require('fs');

var options = {
    key: fs.readFileSync('./../ssl/paulem.key'),
    cert: fs.readFileSync('./../ssl/paulem.crt'),
    ca: fs.readFileSync('./../ssl/paulem-ca.crt'),
    passphrase: "JAFatIkZnBvF84jpfrK9tFD22CYNvP"
};

https.createServer(options, function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World');
}).listen(443);

console.log('server running on port 443');