'use strict';
/**
 *  imports
 */
var path = require('path');
var fs = require('fs');
var restify = require('restify');
var argv = require('minimist')(process.argv.slice(2));
var gcm = require('node-gcm');
var request = require('request');
var certificate = require('./certificate');


/**
 * load config
 */
var Constants = {
    'GCM_SEND_URI': 'https://android.googleapis.com:443/gcm/send'
};

var port = argv.p || argv.port || 443;
var senderId = argv.s || argv.senderId;

if (!senderId) {
    throw new Error('gcm senderId param is necessary');
}

certificate.get(argv.k || argv.key || 'server.key', argv.c || argv.cert || 'server.crt', function (key, cert) {
    if(!key || !cert){
        throw new Error('certificate error');
    }
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
        request({
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-length': Buffer.byteLength(req.body, 'utf8'),
                'Authorization': 'key=' + senderId
            },
            uri: Constants.GCM_SEND_URI,
            body: req.body
        }, function (err, res, resBody) {
            console.log(err, res, resBody);

            // 201 Accepted
            res.send(201);

            // 413 Payload Too Large


            // TTL Acks
        });
    });


    /**
     * PUT aggregate route for aggregated multiple recipients
     *
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
     */
});

function load(filePath) {
    try {
        return fs.readFileSync(path.resolve(filePath), {encoding: 'utf8'});
    } catch (e) {
        if (e.code !== 'ENOENT') {
            throw e;
        }
        return null;
    }
}