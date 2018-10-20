const express = require('express');
const app = express();
const fs = require('fs');

var myLogger = function(req, res, next) {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  fs.appendFile('server.log', log + '\n', err => {
    if (err) {
      console.log('Unable to append to server.log.');
    }
  });
  next();
};

/*To load the middleware function, call app.use(), specifying the middleware
function. For example, the following code loads the myLogger middleware
function before the route to the root path (/).*/
app.use(myLogger);

app.get('/', function(req, res) {
  res.send('Hello World!');
});

app.listen(9999, function() {
  console.log('Listening on port 9999!');
});

// Output :
// Sat Oct 20 2018 17:08:05 GMT+0700 (Western Indonesia Time): GET /
// Sat Oct 20 2018 17:08:06 GMT+0700 (Western Indonesia Time): GET /favicon.ico
