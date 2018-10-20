let express = require('express'),
  session = require('express-session'),
  FileStore = require('session-file-store')(session),
  secret = 'notThatSecretSecret',
  port = process.env.PORT || process.argv[2] || 9999,
  app = express();

//use express-session
app.use(
  session({
    // using FileStore with express-session
    // as the sore method, replacing the default memory store
    store: new FileStore({
      path: './session-store'
    }),
    name: '_fs_demo', // cookie will show up as foo site
    secret: secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      // five year cookie
      maxAge: 1000 * 60 * 60 * 24 * 365 * 5
    }
  })
);

app.get('/', function(req, res) {
  // simple count for the session
  if (!req.session.count) {
    req.session.count = 0;
  }
  req.session.count += 1;

  // send info as json
  res.json(req.session);
});

app.listen(port, function() {
  console.log('session-filestore demo is up on port: ' + port);
});
