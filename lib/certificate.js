'use strict';
var pem = require('pem');
var fs = require('fs');
var path = require('path');

exports.get = function (keyPath, certPath, cb) {
  fs.readFile(path.resolve(keyPath), {encoding: 'utf8'}, function (err, key) {
    if (err) {
      generate(cb);
    } else {
      fs.readFile(path.resolve(certPath), {encoding: 'utf8'}, function (err, cert) {
        if (err) {
          generate(cb);
        } else {
          cb(key, cert);
        }
      });
    }
  });
};

function generate(cb) {
  pem.createCertificate({days: 365, selfSigned: true}, function (err, keys) {
    if (err && !keys) {
      throw new Error(err);
    } else {
      cb(keys.serviceKey, keys.certificate);
    }
  });
}
