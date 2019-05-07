const express = require('express');
const app = express();

app.get('/', (req, res, next) => {
  //takes care of serializing JSON
  res.cookie('setCookies', { items: ["Teman", "Sahabat", "Mantan"] }, { maxAge: 900000 });
  res.end();
});

app.listen(9999, () => console.log('Web Server running on port 9999'));
