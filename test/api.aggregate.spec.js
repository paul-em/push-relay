'use strict';
var expect = require("expect.js");
var request = require('request');
var nock = require('nock');
var helper = require('./helper');
helper.setProcessArgs('--cert ./test/ssl/test.crt --key ./test/ssl/test.key --apikey ./test/apikey/apikey.txt');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // Avoids DEPTH_ZERO_SELF_SIGNED_CERT error for self-signed certs


nock('https://android.googleapis.com:443')
    .post('/gcm/send', function (body) {
        return body.data.data === 'right aggregated data';
    })
    .reply(200, {
        success: 2,
        failure: 0,
        multicast_id: 5201523458607294000,
        canonical_ids: 0,
        results: [
            {
                message_id: 242344935,
                registration_id: 23942395439,
                error: null
            },
            {
                message_id: 242344936,
                registration_id: 23942395439,
                error: null
            }
        ]
    });

nock('https://android.googleapis.com:443')
    .post('/gcm/send', function (body) {
        return body.data.data === 'wrong aggregated data';
    })
    .reply(200, {
        multicast_id: 5201523458607294000,
        success: 0,
        failure: 2,
        canonical_ids: 0,
        results: [
            {
                error: 'InvalidRegistration'
            },
            {
                error: 'InvalidRegistration'
            }
        ]
    });


describe('api aggregate', function () {
    before(function(){
        require('./../index');
    });
    it('should successfully send push message', function (done) {
        request({
            method: 'PUT',
            url: 'https://localhost:443/a',
            json: true,
            body: {
                data:'right aggregated data',
                subscriptionIds:
                    [
                        'APA91bFNE4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa3C79OU',
                        'APA91bFNE4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa3C79OI'
                    ]
            }
        }, function (error, response, body) {
            expect(response.statusCode).to.be(200);
            done();
        });
    });

    it('should return a 400 error for wrong json format', function (done) {
        request({
            method: 'PUT',
            url: 'https://localhost:443/a',
            json: true,
            body: 'nojson'
        }, function (error, response, body) {
            expect(response.statusCode).to.be(400);
            done();
        });
    });

    it('should return a 401 auth error for wrong id', function (done) {
        request({
            method: 'PUT',
            url: 'https://localhost:443/a',
            json: true,
            body: {
                data:'wrong aggregated data',
                subscriptionIds:
                    [
                        'APA91bFNE4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa3C79OU',
                        'APA91bFNE4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa3C79OI'
                    ]
            }
        }, function (error, response, body) {
            expect(response.statusCode).to.be(401);
            done();
        });
    });
});