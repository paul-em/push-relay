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

var port = argv.p || argv.port || 443;
var senderId = argv.s || argv.senderId;
var dryRun = argv.dryrun || false;

if (!senderId) {
    throw new Error('gcm senderId param is necessary');
}

certificate.get(argv.k || argv.key || 'server.key', argv.c || argv.cert || 'server.crt', function (key, cert) {
    if (!key || !cert) {
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
        'text/plain'
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
     * POST route for single recipients
     */
    server.post('/p/:id', function (req, res, next) {
        try {
            var gcmReq = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'key=' + senderId
                },
                uri: 'https://android.googleapis.com:443/gcm/send',
                json: true,
                body: {
                    to: req.params.id,
                    data: {
                        data: req.body
                    },
                    time_to_live: req.headers.ttl,
                    dry_run: dryRun
                }
            };
            request(gcmReq, function (err, resService, resBody) {
                //console.log(resService.statusCode, err, resBody);
                if (err) {
                    return res.send(500);
                }
                if (resService.statusCode !== 200) {
                    if (resService.statusCode === 400 && resBody.indexOf('INVALID_REGISTRATION') !== -1) {
                        return res.send(404);
                    }
                    return res.send(resService.statusCode);
                }

                if (resBody.success === 1) {
                    if (resBody.results[0].registration_id) {
                        res.set('Expires', '0');
                    }
                    return res.send(201);
                }

                var error = resBody.results[0].error;

                switch (error) {
                    case 'NotRegistered':
                        res.send(404);
                        break;
                    case 'MessageTooBig':
                        res.send(413);
                        break;
                    case 'InvalidTtl':
                        res.send(400);
                        break;
                    case 'DeviceMessageRateExceeded':
                    case 'TopicsMessageRateExceeded':
                        res.send(406);
                        break;
                    case 'MissingRegistration':
                    case 'InvalidRegistration':
                    case 'InternalServerError':
                    case 'InvalidDataKey':
                    case 'Unavailable':
                    default:
                        res.send(500);
                }
            });
        } catch (e) {
            res.send(500);
        }
    });
});