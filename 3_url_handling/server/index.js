
var port = 3466;

// Setting up modules
let http = require('http'); // HTTP
let url = require('url'); // URL handling
let fs = require('fs'); // File serving
let path = require('path');


http.createServer(function (req, res) {

    console.log(`${req.method} ${req.url}`);

    // Parse URL
    const parsedUrl = url.parse(req.url);

    // extract URL path
    let pathname = `.${parsedUrl.pathname}`;
    console.log(`Path-Name:${pathname}`);

    if (pathname === './') {
        res.writeHead(301, { "Location": "http://" + req.headers['host'] + '/index.html' });
        return res.end();
    }



    // based on the URL path, extract the file extension. e.g. .js, .doc, ...
    const ext = path.parse(pathname).ext;


    console.log(`${ext}`);

    // maps file extention to MIME typere
    const map = {
        '.ico': 'image/x-icon',
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.json': 'application/json',
        '.css': 'text/css',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.wav': 'audio/wav',
        '.mp3': 'audio/mpeg',
        '.svg': 'image/svg+xml',
        '.pdf': 'application/pdf',
        '.doc': 'application/msword'
    };

    fs.exists(pathname, function (exist) {
        if(!exist) {
            // if the file is not found, return 404
            res.statusCode = 404;
            res.end(`File ${pathname} not found!`);
            return;
        }

        // if is a directory search for index file matching the extention
        if (fs.statSync(pathname).isDirectory()) pathname += '/index' + ext;

        // read file from file system
        fs.readFile(pathname, function(err, data){
            if(err){
                res.statusCode = 500;
                res.end(`Error getting the file: ${err}.`);
            } else {
                // if the file is found, set Content-type and send data
                res.setHeader('Content-type', map[ext] || 'text/plain' );
                res.end(data);
            }
        });
    });
    

}).listen(port);


console.log(`Server listening on port ${port}`);

