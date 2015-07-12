'use strict';
var expect = require("expect.js");
var request = require('request');
require('./helper/nock');
var helper = require('./helper');
helper.setProcessArgs('--cert ./test/ssl/test.crt --key ./test/ssl/test.key --senderId AIzaSyBNHRBzCKW9oUtTItl9qmLEVmRgG4SBys4');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // Avoids DEPTH_ZERO_SELF_SIGNED_CERT error for self-signed certs


describe('api put', function () {
    before(function () {
        require('./../index');
    });
    it('should not send push message to empty id', function (done) {
        request({
            method: 'POST',
            url: 'https://localhost:443/p/',
            'content-type': 'text/plain;charset=utf8',
            body: '4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa'
        }, function (error, response, body) {
            expect(response.statusCode).to.be(404);
            done();
        });
    });
    it('should not send push message to invalid id', function (done) {
        request({
            method: 'POST',
            url: 'https://localhost:443/p/NotRegistered',
            'content-type': 'text/plain;charset=utf8',
            body: '4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa'
        }, function (error, response, body) {
            expect(response.statusCode).to.be(404);
            done();
        });
    });
    it('should not send push message with too large body', function (done) {
        request({
            method: 'POST',
            url: 'https://localhost:443/p/APA91bFNE4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa3C79OU',
            'content-type': 'text/plain;charset=utf8',
            body: '4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa'
        }, function (error, response, body) {
            expect(response.statusCode).to.be(413);
            done();
        });
    });
    it('should not send push message with invalid TTL', function (done) {
        request({
            method: 'POST',
            url: 'https://localhost:443/p/APA91bFNE4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa3C79OU',
            'content-type': 'text/plain;charset=utf8',
            headers: {
              TTL: 'invalid'
            },
            body: 'TTL'
        }, function (error, response, body) {
            expect(response.statusCode).to.be(400);
            done();
        });
    });
    it('should not send push message because of rate exceeded', function (done) {
        request({
            method: 'POST',
            url: 'https://localhost:443/p/APA91bFNE4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa3C79OU',
            'content-type': 'text/plain;charset=utf8',
            body: 'RateExceeded'
        }, function (error, response, body) {
            expect(response.statusCode).to.be(406);
            done();
        });
    });
    it('should successfully send push message', function (done) {
        request({
            method: 'POST',
            url: 'https://localhost:443/p/APA91bFNE4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa3C79OU',
            'content-type': 'text/plain;charset=utf8',
            body: '4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa'
        }, function (error, response, body) {
            expect(response.statusCode).to.be(201);
            done();
        });
    });
});