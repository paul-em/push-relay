# Bandwidth test

To run this test make sure the relay prototype runs on a remote server with the flag "dryrun". Confirm this by typing in the address in your browser. You should see the message "Relay server running" appear in the browser.
Adjust the parameters of the sendLoad.js and index.js file to fit your configuration.
Next run the index file in this folder with the node command. This requires you to have node.js installed on your system. Also the development dependencies of this project need to be installed. After running the command

```
$ node index.js
```

a lot of logs should appear in your console indicating the number of total requests sent so far. Now the bandwidth can be measured on the server by running any command line code suitable for the operating system. In case of an Ubuntu server I used "iftop".
