# Return Latency Test

To run this test make sure the relay prototype runs on a remote server without the flag "dryrun". Confirm this by typing in the address in your browser. You should see the message "Relay server running" appear in the browser.
Adjust the parameters of the index.js file to fit your configuration. Now run the file index.js with the command
```
$ node index.js
```
. This will send requests to GCM and the relay server and save the results in the results.json file.
