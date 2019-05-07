const express = require('express');
const app = express();

/* Syntax
req.get(field)
*/

/* Definition
Returns the specified HTTP request header field (case-insensitive match).
The Referrer and Referer fields are interchangeable. */

app.use('/admin', function(req, res, next) {
  // GET 'http://www.example.com/admin/new'
  console.log(req.get('Content-Type'));
  // => "text/plain"

  console.log(req.get('content-type'));
  // => "text/plain"

  console.log(req.get('user-agent'));

  // => undefined
  next();
});

app.get('/', (req, res) => {
  res.send('Your Request path Recorded on the server!');
});

app.listen(9999, () => console.log('Web Server running on port 9999'));
