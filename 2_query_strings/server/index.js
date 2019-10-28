const http = require("http");
const url = require('url');



const hostname = 'localhost';
const port = 3466;

// Create the server to work with the query string
http.createServer(function (req, res) {


    // Send an OK header since everything is fine here
    res.writeHead(200, {'Content-Type': 'text/html'});

    var q = url.parse(req.url,true);

    // Split the URL into parts
    var queryData = url.parse(req.url, true).query;


    // Build the response
    // Now we have an object we can work with
    // We can execute code here for that purpose
    var d = new Date();

    var returnValue = `Request DateTime = ${d}`;
    returnValue += `<br>Reuqested URL = ${req.url.toString()}`;


    // Check if query String is empty
    if (q.search == null) {
        returnValue += `<br>Query Data: is NULL`;
    } else {
        returnValue += `<br>Query String: ${q.search}`;

        // Parse URL Search Parameters using query function.
        var qdata = q.query;
        returnValue += `<br>Query Data (Formatted as JSON): ${JSON.stringify(qdata)}`;
    }

    // End the response and send back returnValue
    res.end(returnValue);

}).listen(port);

