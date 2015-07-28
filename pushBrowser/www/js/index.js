var onNotificationGCM;
var registration;
var ref;
var shim;
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    console.log('device ready');
    ref = window.open('https://paulem.eu/~/gamechallenge', '_blank', 'location=yes,EnableViewPortScale=yes');
    shim = document.getElementById('ServiceWorkerShim').innerText;
    getRegistrationID().then(function (_registration) {
        registration = _registration;
        console.log('got registration id', registration);
        injectJs();
        ref.addEventListener('loadstop', function () {
            injectJs();
        });

        ref.addEventListener('loadstart', function () {
            console.log('loadStart event');
            injectJs();
        });

        ref.addEventListener('error', function (e) {
            console.log('error', e);
        });
    });
}

function injectJs() {
    ref.executeScript({
        code: 'navigator.dummyServiceWorkerRegistrationId = "' + registration.registrationId + '";' +
        'navigator.dummyServiceWorkerEndpoint = "' + registration.endpoint + '";' + shim
    }, function () {
        console.log('injected script');
    });
}

function getRegistrationID() {
    return new Promise(function (fulfill, reject) {
        var timedOut = false, found = false;
        if (window.plugins && window.plugins.pushNotification) {
            window.plugins.pushNotification.register(function () {
                setTimeout(function () {
                    if (!found) {
                        timedOut = true;
                        reject('finding regid timed out');
                    }
                }, 20000);
            }, function () {
                reject('register fail');
            }, {'senderID': '1214094664', 'ecb': 'onNotificationGCM'});		// required!


            onNotificationGCM = function (e) {
                console.log('notification!', e);
                var data = {};
                try {
                    data = JSON.stringify(e);
                } catch (e) {
                    data = {};
                }
                if (e.event === 'registered') {
                    if (!timedOut) {
                        found = true;
                        if (e.regid.length > 0) {
                            // Your GCM push server needs to know the regID before it can push to this device
                            // here is where you might want to send it the regID for later use.
                            fulfill({
                                registrationId: e.regid,
                                endpoint: 'https://paulem.eu'
                            });
                        } else {
                            reject('got no real regid');
                        }
                    } else {
                        console.log('found regid after timeout');
                    }
                }

                if (e.event === 'message') {
                    console.log('notification ', e.payload);

                    ref.executeScript({
                        code: 'if(onNotificationGCM){onNotificationGCM({event: ' + e.event + ', payload: JSON.parse('+ JSON.stringify(e.payload)+')})}'
                    }, function () {
                        console.log('delivered notification to system script');
                    });
                }
            };
        } else {
            reject('no pushNotification plugin found')
        }
    });
}