'use strict';
var expect = require('expect.js');
var helper = require('./helper');
var proxyquire =  require('proxyquire');

function start(){
    proxyquire('./../index', {});
}

describe('server start', function(){
    it('should throw a missing arguments error', function(){
        helper.setProcessArgs('--port 8000');
        expect(start).to.throwException(/cert/i);
    });

    it('should throw missing cert error', function(){
        helper.setProcessArgs('--key ./test/ssl/test.key --apikey ./test/apikey/apikey.txt --port 8001');
        expect(start).to.throwException(/cert/i);
    });

    it('should throw missing key error', function(){
        helper.setProcessArgs('--cert ./test/ssl/test.crt --apikey ./test/apikey/apikey.txt --port 8002');
        expect(start).to.throwException(/key/i);
    });

    it('should throw missing apikey error', function(){
        helper.setProcessArgs('--cert ./test/ssl/test.crt --key ./test/ssl/test.key --port 8003');
        expect(start).to.throwException(/apikey/i);
    });

    it('should throw wrong cert error', function(){
        helper.setProcessArgs('--cert ./test/ssl/wrongtest.crt --key ./test/ssl/test.key --apikey ./test/apikey/apikey.txt --port 8004');
        expect(start).to.throwException(/cert/i);
    });

    it('should throw wrong key error', function(){
        helper.setProcessArgs('--cert ./test/ssl/test.crt --key ./test/ssl/wrongtest.key --apikey ./test/apikey/apikey.txt --port 8005');
        expect(start).to.throwException(/key/i);
    });

    it('should throw wrong apikey error', function(){
        helper.setProcessArgs('--cert ./test/ssl/test.crt --key ./test/ssl/test.key --apikey wrong --port 8006');
        expect(start).to.throwException(/apikey/i);
    });

    it('should successfully start server', function(){
        helper.setProcessArgs('--cert ./test/ssl/test.crt --key ./test/ssl/test.key --apikey ./test/apikey/apikey.txt --port 8007');
        expect(start).to.not.throwException();
    });
});
