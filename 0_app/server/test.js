// Variables are being set as constants for easier access to the app
// For production this set up may not be optimal

// Require the HTTP module for basic server functionality
const http = require("http");

// Set the hostname, can also be an address (e.g. 127.0.0.1)
const hostname = 'localhost';

// Set the port, for this test we’re using 999
// Common port usage reference:
// https://en.wikipedia.org/wiki/List_of_TCP_and_UDP_port_numbers
const port = 3469;

//Create a server object and listen on the port we set for requests
const server = http.createServer((req, res) => {

    //Set the response variables
    // HTTP status code 200 OK
    res.statusCode = 200;

// HTTP header as plain text
res.setHeader('Content-Type', 'text/plain');

// Text to be displayed
res.end('Hello World\n');
});

// Now that everything is set up, the server listens for requests
// When a request comes in to the server it will pass the port and host info

// The values passed when the function is called can then be displayed
server.listen(port, hostname, () => {
    console.log(`http://${hostname}:${port}/` + 'ok');
});
