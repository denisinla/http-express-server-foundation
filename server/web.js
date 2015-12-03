<<<<<<< HEAD
var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/../public'));

app.listen(app.get('port'), function() {
  console.log("Express running on localhost:" + app.get('port'));
});
=======
// DEPENDENCIES
// ============
var express = require("express"),
    http = require("http"),
    port = (process.env.PORT || 3000),
    server = module.exports = express();

// SERVER CONFIGURATION
// ====================
server.configure(function () {

    server.use(express["static"](__dirname + "/../public"));

    server.use(express.errorHandler({

        dumpExceptions:true,

        showStack:true

    }));

    server.use(server.router);
});

// SERVER
// ======

// Start Node.js Server
http.createServer(server).listen(port);

console.log('Node server loaded! Happy Hacking!');
>>>>>>> parent of 27cf500... Update: Fixes.
