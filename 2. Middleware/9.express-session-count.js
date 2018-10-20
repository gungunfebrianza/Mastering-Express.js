var express = require('express'),
  app = express(),
  session = require('express-session');
// using express-session
app.use(
  require('express-session')({
    //name: '_es_demo', // The name of the cookie
    secret: '1234', // The secret is required, and is used for signing cookies
    resave: false, // Force save of session for each request.
    saveUninitialized: false // Save a session that is new, but has not been modified
  })
);

// single path for root
app.get('/', function(req, res) {
  // simple count for the session
  if (!req.session.count) {
    req.session.count = 0;
  }
  req.session.count += 1;

  // respond with the session object
  res.json(req.session);
});

app.listen(9999, () => console.log('Web Server running on port 9999'));
