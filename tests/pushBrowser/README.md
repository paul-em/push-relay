# Push Browser

This is not an actual test with a measurable result but rather a test to see how a browser with the relay functionality could look like.
To run this test make sure the relay prototype runs on a remote server without the flag "dryrun". Confirm this by typing in the address in your browser. You should see the message "Relay server running" appear in the browser.
Adjust the senderId in the file deviceTest/www/js/index.js.
The pushBrowser app needs to be installed on the Android device. This required cordova phonegap and the Android SDK to be installed on your computer. First adjust the directory by running the command
```
$ cordova platform add android
```
This will add an android folder. Now you connect your phone to your computer via USB and run
```
$ cordova run android
```
to install the APK on your device.
