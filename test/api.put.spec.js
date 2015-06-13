'use strict';
var expect = require("expect.js");
var request = require('request');
var nock = require('nock');
var helper = require('./helper');
helper.setProcessArgs('--cert ./test/ssl/test.crt --key ./test/ssl/test.key --senderId AIzaSyBNHRBzCKW9oUtTItl9qmLEVmRgG4SBys4');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // Avoids DEPTH_ZERO_SELF_SIGNED_CERT error for self-signed certs


nock('https://android.googleapis.com:443')
    .post('/gcm/send', function (body) {
        return body.data.data === 'right data';
    })
    .reply(200, {
        success: 1,
        failure: 0,
        multicast_id: 5201523458607294000,
        canonical_ids: 0,
        results: [
            {
                message_id: 242344935,
                registration_id: 23942395439,
                error: null
            }
        ]
    });

nock('https://android.googleapis.com:443')
    .post('/gcm/send', function (body) {
        return body.data.data === 'wrong data';
    })
    .reply(200, {
        multicast_id: 5201523458607294000,
        success: 0,
        failure: 1,
        canonical_ids: 0,
        results: [
            {
                error: 'InvalidRegistration'
            }
        ]
    });


describe('api put', function () {
    before(function(){
        require('./../index');
    });
    it('should successfully send push message', function (done) {
        var message = 'right data';
        request({
            method: 'PUT',
            url: 'https://localhost:443/p/APA91bFNE4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa3C79OU',
            'content-type': 'text/plain;charset=utf8',
            'content-length': message.length,
            body: message
        }, function (error, response, body) {
            expect(body).not.to.be.ok();
            expect(response.statusCode).to.be(200);
            done();
        });
    });

    it('should return a 401 auth error for wrong id', function (done) {
        var message = 'wrong data';
        request({
            method: 'PUT',
            url: 'https://localhost:443/p/APA91bFNE4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa3C79OU',
            'content-type': 'text/plain;charset=utf8',
            'content-length': message.length,
            body: message
        }, function (error, response, body) {
            expect(body).to.be.ok();
            expect(response.statusCode).to.be(401);
            done();
        });
    });
});