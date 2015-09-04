/*
 * This test should run on the relay server
 */
var usage = require('usage');
var fs = require('fs');

var pid = 22786; // check if correct pid of main process
var startTime = Date.now();
var options = {keepHistory: true};
var data = [];

setInterval(function(){
  usage.lookup(pid, options, function (err, result) {
    if (err) throw err;
    result.ts = Date.now();
    console.log(result.cpu);
    data.push(result);
    if(data.length % 60 === 0){
      saveReport();
    }
  });
}, 200);

function saveReport(){
  fs.writeFile(__dirname + '/results.json', JSON.stringify(data, null, 2), function (err) {
    if (err) throw err;
    console.log('saved report after', Math.round((Date.now() - startTime) / 1000 / 60), 'min');
  });
}

