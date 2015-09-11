/*** adjustable parameters ***/
var concurrency = 10;
var authorization = 'AIzaSyCjwXopyMFOpL0C5SOzvKdC9U3hVe2LZvw';
var relayServerLocation = 'https://paulem.eu:9000';
/*****************************/

var loadtest = require('loadtest');
var Q = require('q');

runTest();

function runTest() {
  console.log('test running');
  testLoad({
    insecure: true,
    concurrency: concurrency,

    method: 'POST',
    url: relayServerLocation  + '/p/APA91bHDsiWcJT50jFq8d_m-gd6YDds4CqaNIKU4G4g9eq_eIZ4uOUERJWZcaXLgpKWG7qEJtOwtZRN_LpsOm8hTiHZDW19OM4c8vXN8Yz4SZVabZfdxhF4LtmS_ocr3vRzfG86rkR39',
    'content-type': 'text/plain;charset=utf8',
    headers: {
      Authorization: 'key=' + authorization
    },
    body: '4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZaW3ca' // 100 bytes
  }).then(runTest)
    .catch(function (error) {
      console.log('error in loadTest', error)
    });
}


function testLoad(options) {
  var deferred = Q.defer();
  options.statusCallback = function (result) {
      console.log(result)
  };
  loadtest.loadTest(options, function (error, result) {
    if (error) {
      deferred.reject(error);
    } else {
      deferred.resolve(result);
    }
  });
  return deferred.promise;
}
