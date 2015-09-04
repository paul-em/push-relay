/*
 * This test should be run from another server than the relay server to see actual latency time
 */

var loadtest = require('loadtest');
var Q = require('q');
var fs = require('fs');

var maxRequests;
var concurrency = 50;
var maxConcurrency = 55;
var requestsPerConcurrency = 100;
var startTime = Date.now();
var c = 0;
var total = 0;
for (var i = concurrency; i < maxConcurrency; i++) {
  total += requestsPerConcurrency * i;
}
total = total * 2;

var overallResults = [];
runTest();

function runTest() {
  if (!concurrency) {
    concurrency = 1;
    maxRequests = requestsPerConcurrency;
  } else {
    concurrency++;
    maxRequests += requestsPerConcurrency;
  }
  console.log('running tests with concurrency', concurrency);
  Q.all(
    [
      testLoad({
        maxRequests: maxRequests,
        insecure: true,
        concurrency: concurrency,

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
      }),
      testLoad({
        maxRequests: maxRequests,
        insecure: true,
        concurrency: concurrency,

        method: 'POST',
        url: 'https://paulem.eu:9000/p/APA91bHDsiWcJT50jFq8d_m-gd6YDds4CqaNIKU4G4g9eq_eIZ4uOUERJWZcaXLgpKWG7qEJtOwtZRN_LpsOm8hTiHZDW19OM4c8vXN8Yz4SZVabZfdxhF4LtmS_ocr3vRzfG86rkR39',
        'content-type': 'text/plain;charset=utf8',
        headers: {
          Authorization: 'key=AIzaSyCjwXopyMFOpL0C5SOzvKdC9U3hVe2LZvw'
        },
        body: '4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa'
      })
    ])
    .then(compare)
    .catch(function (error) {
      console.log('error in loadTest', error)
    });
}


function testLoad(options) {
  var deferred = Q.defer();
  options.statusCallback = function (result) {
    c++;
    if (c % 100 === 0) {
      console.log('done', c, '/', total)
    }
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

function compare(results) {
  if (results[0].totalErrors > 0) {
    console.warn('errors occured in gcm!', results[0].errorCodes);
  }
  if (results[1].totalErrors > 0) {
    console.warn('errors occured in relay!', results[1].errorCodes);
  }
  overallResults.push({
    concurrency: concurrency,
    gcm: results[0],
    relay: results[1]
  });
  if (concurrency < maxConcurrency) {
    runTest();
  } else {
    fs.writeFile(__dirname + '/results.json', JSON.stringify(overallResults, null, 2), function (err) {
      if (err) throw err;
      console.log('load test finished after', Math.round((Date.now() - startTime) / 1000 / 60), 'min');
      process.exit();
    });
  }
}
