/*** adjustable parameters ***/
var requests = 1000;
var relayServerLocation = 'https://paulem.eu:9001';
var authorization = 'AIzaSyCjwXopyMFOpL0C5SOzvKdC9U3hVe2LZvw';
var token = 'APA91bE-NEY9liJMcMi8MJV8QmEdHhZHLinqP6hvxtUd4IkNWrD_FpFpulFism47gj2oKq4zaez5Sr0M_Bs7MkLxre2G3w1bEP_UQi4P60wBjyI1CXq-e7VJuPBzxGzzwRjl8edHdPki';
/*****************************/

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
var request = require('request');

circleRelay(0, requests, function () {
  console.log('done');
  circleGCM(0, requests, function () {
    console.log('done');
  });
});



function circleRelay(c, max, callback) {
  request({
    insecure: true,
    method: 'POST',
    url: relayServerLocation + '/p/' + token,
    'content-type': 'text/plain;charset=utf8',
    headers: {
      Authorization: 'key=' + authorization
    },
    body: JSON.stringify({sent: Date.now(), relay: true})
  }, function (error, response, body) {
    console.log(error, response.statusCode, body);
    c++;
    if(c >= max){
      callback();
    } else {
      circleRelay(c, max, callback);
    }
  });
}


function circleGCM(c, max, callback) {
  request({
    'method': 'POST',
    'headers': {
      'Content-Type': 'application/json',
      Authorization: 'key=' + authorization
    },
    url: 'https://android.googleapis.com/gcm/send',
    'json': true,
    'body': {
      'to': token,
      'data': {
        'data': JSON.stringify({sent: Date.now(), relay: false})
      }
    }
  }, function (error, response, body) {
    console.log(error, response.statusCode, body);
    c++;
    if(c >= max){
      callback();
    } else {
      circleGCM(c, max, callback);
    }
  });
}
