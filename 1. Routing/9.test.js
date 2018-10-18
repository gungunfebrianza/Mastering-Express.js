const express = require('express');
const app = express();
var birds = require('./8.module-bird');

app.use('/birds', birds);
app.get('/', (req, res, next) => {
  res.send('Home');
});

app.listen(9999, () => console.log('Web Server running on port 9999'));
