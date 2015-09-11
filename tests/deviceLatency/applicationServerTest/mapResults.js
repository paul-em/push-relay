var results = require('./results');
var fs = require('fs');

var min = null;
var gcmMean;
var gcmMeanTotal = 0;
var gcmMeanTotalC = 0;
var gcmStats = [];
var relayMean;
var relayMeanTotal = 0;
var relayMeanTotalC = 0;
var relayStats = [];


// normalize to minimum 100ms
results.forEach(function (re) {
  if (min === null || re.diff < min) {
    min = re.diff;
  }
});
results.forEach(function (re) {
  re.diff = re.diff - min + 100;
  if (re.relay) {
    relayMeanTotal += re.diff;
    relayMeanTotalC++;
  } else {
    gcmMeanTotal += re.diff;
    gcmMeanTotalC++;
  }
});

relayMean = relayMeanTotal / relayMeanTotalC;
gcmMean = gcmMeanTotal / gcmMeanTotalC;

console.log('gcm mean', gcmMean);
console.log('relay mean', relayMean);

results.forEach(function (re) {
  var cat = Math.round(re.diff / 10);
  if (re.relay) {
    if (!relayStats[cat]) {
      relayStats[cat] = 0;
    }
    relayStats[cat]++;
  } else {
    if (!gcmStats[cat]) {
      gcmStats[cat] = 0;
    }
    gcmStats[cat]++;
  }
});

for (var i = 0; i < relayStats.length; i++) {
  if (!relayStats[i]) {
    relayStats[i] = 0;
  }
}
for (var j = 0; j < gcmStats.length; j++) {
  if (!gcmStats[j]) {
    gcmStats[j] = 0;
  }
}
fs.writeFile(__dirname + '/mappedResults.json', JSON.stringify({gcm: gcmStats, relay: relayStats}, null, 2), function (err) {
  if (err) throw err;
  console.log('saved mappedResults');
});
