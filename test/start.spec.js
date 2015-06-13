'use strict';
var expect = require('expect.js');
var helper = require('./helper');
var proxyquire =  require('proxyquire');

function start(){
    proxyquire('./../index', {});
}

describe('server start', function(){

    it('should throw missing senderId error', function(){
        expect(start).to.throwException(/senderId/i);
    });

    it('should start server successfully', function(){
        helper.setProcessArgs('--senderId 12345678');
        expect(start).to.not.throwException();
    });
});
