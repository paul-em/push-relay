# CPU and RAM test

To run this test make sure the relay prototype runs on a remote server with the flag "dryrun". Confirm this by typing in the address in your browser. You should see the message "Relay server running" appear in the browser.
Adjust the parameters of the sendLoad.js and index.js file to fit your configuration.
To measure the CPU and RAM on the relay server run the index.js of this folder file on it. It will measure the CPU and RAM usage and store it in a results.json file. The results are updated every 60 seconds.
```
$ node index.js
```
Next run the sendLoad.js file in this folder with the node command. This requires you to have node.js installed on your system. Also the development dependencies of this project need to be installed. After running the command
```
$ node sendLoad.js
```
a lot of logs should appear in your console indicating the number of total requests sent so far.
After the sendLoad finished wait for the next save of the index.js file on the relay server and stop it. Copy the results.json file to your local machine and run the file map.js.
```
$ node map.js
```
Now the file mappedResults.json should be updated width the data mapped of timetable.json and results.json.
