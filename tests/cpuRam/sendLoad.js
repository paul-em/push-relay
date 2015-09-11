/*** adjustable parameters ***/
var maxConcurrency = 81;
var requestsPerConcurrency = 1;
var relayServerLocation = 'https://paulem.eu:9000';
var authorization = 'AIzaSyCjwXopyMFOpL0C5SOzvKdC9U3hVe2LZvw';
/*****************************/

var loadtest = require('loadtest');
var Q = require('q');
var fs = require('fs');

var maxRequests;
var concurrency = 0;
var startTime = Date.now();
var c = 0;
var total = 0;
for (var i = concurrency; i < maxConcurrency; i++) {
  total += requestsPerConcurrency * i;
}
total = total * 2;

var timeTable = [];
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

  testLoad({
    maxRequests: maxRequests,
    insecure: true,
    concurrency: concurrency,

    method: 'POST',
    url: relayServerLocation + '/p/APA91bHDsiWcJT50jFq8d_m-gd6YDds4CqaNIKU4G4g9eq_eIZ4uOUERJWZcaXLgpKWG7qEJtOwtZRN_LpsOm8hTiHZDW19OM4c8vXN8Yz4SZVabZfdxhF4LtmS_ocr3vRzfG86rkR39',
    'content-type': 'text/plain;charset=utf8',
    headers: {
      Authorization: 'key=' + authorization
    },
    body: '4p2LmDNaZhuoBV-W6fRlE_nYnGjLcEZa'
  }).then(compare)
    .catch(function (error) {
      console.log('error in loadTest', error)
    });
}


function testLoad(options) {
  var deferred = Q.defer();
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
  if (results.totalErrors > 0) {
    console.warn('errors occured in gcm!', results.errorCodes);
  }
  timeTable.push({
    concurrency: concurrency,
    ts: Date.now()
  });
  if (concurrency < maxConcurrency) {
    runTest();
  } else {
    fs.writeFile(__dirname + '/timetable.json', JSON.stringify(timeTable, null, 2), function (err) {
      if (err) throw err;
      console.log('load test finished after', Math.round((Date.now() - startTime) / 1000 / 60), 'min');
      process.exit();
    });
  }
}
