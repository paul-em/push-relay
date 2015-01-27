'use strict';
var expect = require('expect.js');
var helper = require('./helper');

function start(){
    require('./../lib');
}

describe('server start', function(){
    it('should throw a missing arguments error', function(){
        expect(start).to.throwException(/arguments/);
    });

    it('should throw missing cert error', function(){
        helper.setProcessArgs('--key ./test/ssl/test.key --apikey ./test/apikey/apikey.txt');
        expect(start).to.throwException(/arguments/);
    });

    it('should throw missing key error', function(){
        helper.setProcessArgs('--cert ./test/ssl/test.crt --apikey ./test/apikey/apikey.txt');
        expect(start).to.throwException(/arguments/);
    });

    it('should throw missing apikey error', function(){
        helper.setProcessArgs('--cert ./test/ssl/test.crt --key ./test/ssl/test.key');
        expect(start).to.throwException(/arguments/);
    });

    it('should throw wrong cert error', function(){
        helper.setProcessArgs('--cert ./test/ssl/wrongtest.crt --key ./test/ssl/test.key --apikey ./test/apikey/apikey.txt');
        expect(start).to.throwException(/no such file/);
    });

    it('should throw wrong key error', function(){
        helper.setProcessArgs('--cert ./test/ssl/test.crt --key ./test/ssl/wrongtest.key --apikey ./test/apikey/apikey.txt');
        expect(start).to.throwException(/no such file/);
    });

    it('should throw wrong apikey error', function(){
        helper.setProcessArgs('--cert ./test/ssl/test.crt --key ./test/ssl/test.key --apikey wrong');
        expect(start).to.throwException(/no such file/);
    });

    it('should successfully start server', function(){
        helper.setProcessArgs('--cert ./test/ssl/test.crt --key ./test/ssl/test.key --apikey ./test/apikey/apikey.txt');
        expect(start).to.not.throwException();
    });
});
