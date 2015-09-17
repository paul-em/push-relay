/*** adjustable parameters ***/
var maxConcurrency = 200;
var requestsPerConcurrency = 1;
var relayServerLocation = 'http://localhost:3000';
//var relayServerLocation = 'http://localhost/push-relay-gcm/tests/languages/php/index.php';
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

var results = [];
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
    concurrency: concurrency,
    method: 'POST',
    url: relayServerLocation
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

function compare(result) {
  if (result.totalErrors > 0) {
    console.warn('errors occured in gcm!', result.errorCodes);
  }
  results.push({
    concurrency: concurrency,
    data: result
  });
  if (concurrency < maxConcurrency) {
    runTest();
  } else {
    fs.writeFile(__dirname + '/results.json', JSON.stringify(results, null, 2), function (err) {
      if (err) throw err;
      console.log('load test finished after', Math.round((Date.now() - startTime) / 1000 / 60), 'min');
      process.exit();
    });
  }
}
