# Relay
The project is a prove of concept and is not meant to be used in any production environment.

## Push Relay for Google Cloud Messaging
Standardized Push Messaging and Push Notifications for Web Applications

In contrast to native applications the web is decentralized and runs on multiple platforms. Bringing programming interfaces from native to the web is therefore not always simple. For the new Push API, which aims to deliver push messages for websites, the problem of how to handle different push services arises. In an ideal world all push services would run the same protocol, but unfortunately this is not the case. In order to communicate with multiple services the code has to be adjusted for each of them. 
My project will take a look at another way to tackle this problem by adding a new server that exposes a unified protocol.

## How to get the relay server running

In order to try out this project you have to deploy the index.js and package.js to a server. Also put your SSL key and cert file in this folder, because the server only runs on SSL. Another file is needed in order to store your api key of gcm.

* server.key
* server.crt
* apikey

If you want to use files in other locations use --cert, --key and --apikey when starting the server.
In order to change the port where the server is running use --port.
