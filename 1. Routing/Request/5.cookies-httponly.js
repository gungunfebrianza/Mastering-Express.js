const express = require('express');
const app = express();

app.get('/', (req, res, next) => {
  res.cookie('setCookies', 'httpOnly', {
    expires: new Date(Date.now() + 900000),
    httpOnly: true
  });
  res.end();
});

app.listen(9999, () => console.log('Web Server running on port 9999'));
