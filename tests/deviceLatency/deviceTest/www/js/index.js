var pushData = [];
var $ul;
var fulfillRegistration;
var registered = false;

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
  console.log('device ready');
  getRegistrationID().then(function (registration) {
    console.log('got registration id', registration);
    document.querySelector('h1').innerText = registration;
  });
}

function getRegistrationID() {
  return new Promise(function (fulfill, reject) {
    var timedOut = false;
    fulfillRegistration = fulfill;
    if (window.plugins && window.plugins.pushNotification) {
      window.plugins.pushNotification.register(function () {
        setTimeout(function () {
          if (!registered) {
            timedOut = true;
            reject('finding regid timed out');
          }
        }, 20000);
      }, function () {
        reject('register fail');
      }, {'senderID': '310734510853', 'ecb': 'onNotificationGCM'});		// required!
    } else {
      reject('no pushNotification plugin found')
    }
  });
}

function onNotificationGCM(e) {
  var received = Date.now();
  console.log('notification!', e);

  if (e.event === 'registered') {
    registered = true;
    fulfillRegistration(e.regid);
  }

  if (e.event === 'message') {
    console.log('notification ', e.payload.data);
    var data = {};
    if (typeof e.payload.data === 'string') {
      try {
        data = JSON.parse(e.payload.data);
      } catch (e) {
        data = {};
      }
    } else {
      data = e.payload.data;
    }
    pushData.push({diff: received - data.sent, relay: data.relay});
    document.querySelector('h1').innerText = pushData.length + '';
  }
}
