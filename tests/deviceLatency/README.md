# Device Latency Test

To run this test make sure the relay prototype runs on a remote server without the flag "dryrun". Confirm this by typing in the address in your browser. You should see the message "Relay server running" appear in the browser.
Adjust the parameters of the applicationServerTest/sendPush.js file to fit your configuration. Also change the senderId in the file deviceTest/www/js/index.js.
First the deviceTest app needs to be installed on the Android device. This required cordova phonegap and the Android SDK to be installed on your computer. First adjust the deviceTest directory by running the command
```
$ cordova platform add android
```
This will add an android folder. Now you connect your phone to your computer via USB and run
```
$ cordova run android
```
to install the APK on your device. After the app opens it takes a couple of seconds until your registration token appears on the screen. Connect your phone to your computer and open up the chrome inspect devices page. Here the application should be listed and can be inspected. In the newly opened window the device token can be selected and copied into the applicationServerTest/sendPush.js file.
Now run the file sendPush.js with the command
```
$ node ./applicationServerTest/sendPush.js
```
. This will send 1000 request to the relay server and GCM directly and store them in a file called results.json afterwards. To better sort the data run mapResults.js which will store the mapped data in mappedResutls.json.
