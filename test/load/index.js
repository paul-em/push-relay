var loadtest = require('loadtest');
var helper = require('./../helper');
helper.setProcessArgs('--dryrun --port 9000');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // Avoids DEPTH_ZERO_SELF_SIGNED_CERT error for self-signed certs
require('./../../index');

var relayResults, gcmResults;
setTimeout(testRelayServer, 1000);

function testRelayServer() {
  var options = {
    maxRequests: 1000,
    insecure: true,

    method: 'POST',
    url: 'https://localhost:9000/p/APA91bHDsiWcJT50jFq8d_m-gd6YDds4CqaNIKU4G4g9eq_eIZ4uOUERJWZcaXLgpKWG7qEJtOwtZRN_LpsOm8hTiHZDW19OM4c8vXN8Yz4SZVabZfdxhF4LtmS_ocr3vRzfG86rkR39',
    'content-type': 'text/plain;charset=utf8',
    headers: {
      Authorization: 'key=AIzaSyCjwXopyMFOpL0C5SOzvKdC9U3hVe2LZvw'
    },
    body: '4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa'
  };

  console.log('running loadtest for relay server');
  loadtest.loadTest(options, function (error, result) {
    if (error) {
      return console.error('Got an error: %s', error);
    }
    console.log('Tests run successfully', result);
    relayResults = result;
    testGCM();
  });
}

function testGCM() {
  var options = {
    maxRequests: 1000,
    insecure: true,

    method: 'POST',
    'headers': {
      'Content-Type': 'application/json',
      'Authorization': 'key=AIzaSyCjwXopyMFOpL0C5SOzvKdC9U3hVe2LZvw'
    },
    'url': 'https://android.googleapis.com:443/gcm/send',
    'body': {
      'to': 'APA91bHDsiWcJT50jFq8d_m-gd6YDds4CqaNIKU4G4g9eq_eIZ4uOUERJWZcaXLgpKWG7qEJtOwtZRN_LpsOm8hTiHZDW19OM4c8vXN8Yz4SZVabZfdxhF4LtmS_ocr3vRzfG86rkR39',
      'data': {
        'data': '4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa'
      },
      'dry_run': true
    }
  };
  console.log('running loadtest for gcm server');
  loadtest.loadTest(options, function (error, result) {
    if (error) {
      return console.error('Got an error: %s', error);
    }
    console.log('Tests run successfully', result);
    gcmResults = result;
    compare();
  });
}

function compare(){
  if(relayResults.totalErrors !== 0 || gcmResults.totalErrors !== 0){
    console.log('could not compare results because there were errors');
    return;
  }
  console.log('added mean latency of relay server', relayResults.meanLatencyMs - gcmResults.meanLatencyMs, 'ms');
  process.exit();
}
