var results = require('./results');
var timetable = require('./timetable');
var fs = require('fs');

var mappedResults = [];

var start = 0;
var concurrency = 0;
var buffer = [];
results.forEach(function (result) {
  for (var i = start; i < timetable.length; i++) {
    if (timetable[i].ts > result.ts) {
      start = i;
      if (concurrency !== timetable[i].concurrency && buffer.length > 0) {
        // new concurreny
        var c = 0;
        var total = {cpu: 0, memory: 0};
        buffer.forEach(function (val) {
          c++;
          total.cpu += val.cpu;
          total.memory += val.memory;
        });
        mappedResults.push({
          cpu: Math.round(total.cpu / c),
          memory: Math.round(total.memory / c / 1000 / 100) / 10,
          concurrency: concurrency
        });
        buffer = [];
      }
      buffer.push(result);
      concurrency = timetable[i].concurrency;
      break;
    }
  }
});
fs.writeFile(__dirname + '/mappedResults.json', JSON.stringify(mappedResults, null, 2), function (err) {
  if (err) throw err;
  console.log('saved mappedResults');
});
