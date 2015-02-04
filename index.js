'use strict';

/**
 *  imports
 */
var restify = require('restify');
var argv = require('minimist')(process.argv.slice(2));
var fs = require('fs');
var gcm = require('node-gcm');


/**
 * load config
 */

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // Avoids DEPTH_ZERO_SELF_SIGNED_CERT error for self-signed certs

try {
    var certPath = argv.cert || 'server.crt';
    var cert = fs.readFileSync(certPath, {encoding: 'utf8'});
    var keyPath = argv.key || 'server.key';
    var key = fs.readFileSync(keyPath, {encoding: 'utf8'});
    var apikeyPath = argv.apikey || 'apikey';
    var apikey = fs.readFileSync(apikeyPath, {encoding: 'utf8'});
    var port = argv.port || 443;
} catch (e) {
    if (e.code !== 'ENOENT') {
        throw e;
    }
}
if (!cert) {
    throw new Error('Cert file not found in path ' + certPath);
}
if (!key) {
    throw new Error('Key file not found in path ' + keyPath);
}
if (!apikey) {
    throw new Error('ApiKey file not found in path ' + apikeyPath);
}

/**
 * set up gcm
 */
var sender = new gcm.Sender(apikey);

/**
 * set up server
 */
var server = restify.createServer({
    certificate: cert,
    key: key,
    name: 'RelayServerGCM'
});
server.acceptable = [
    'text/plain',
    'application/json'
];

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(function (req, res, next) {
    req.setEncoding('utf8');
    req.body = '';
    req.on('data', function (chunk) {
        req.body += chunk;
    });
    req.on('end', function () {
        next();
    });
});
server.use(restify.gzipResponse());
server.listen(port);
console.log('server listening on port', port);

/**
 * PUT route for single recipients
 */
server.put('/p/:id', function (req, res, next) {
    var body;
    try {
        body = JSON.parse(req.body);
    } catch (e) {
        body =  {data: req.body};
    }
    console.log(body);
    sender.sendNoRetry(new gcm.Message({
        data: body
    }), [req.params.id], function (err, result) {
        if (err) {
            res.send(500, err);
        } else if (!result || result.failure === 1) {
            res.send(401, result.results[0]);
        } else {
            res.send(200);
        }
    });
});

/**
 * PUT aggregate route for aggregated multiple recipients
 */
server.put('/a', function (req, res, next) {
    var body;
    try {
        body = JSON.parse(req.body);
    } catch (e) {
        res.send(400, 'no json object');
        return;
    }
    if (!body || !body.data || !body.subscriptionIds) {
        res.send(400, 'no json object');
        return;
    }
    sender.sendNoRetry(new gcm.Message({
        data: {
            data: body.data
        }
    }), body.subscriptionIds, function (err, result) {
        if (err) {
            res.send(500, err);
        } else if (!result || result.failure === body.subscriptionIds.length) {
            res.send(401, result.results);
        } else {
            res.send(200, result.results);
        }
    });
});


