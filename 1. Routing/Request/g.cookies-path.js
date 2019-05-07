const express = require('express');
const app = express();

app.get('/admin', (req, res, next) => {
  res.end('admin');
});

app.get('/dashboard', (req, res, next) => {
  res.cookie('SetCookies', 'forDashboard', {
    path: '/dashboard'
  });
  res.end('Dashboard');
});

app.get('/dashboard/A', (req, res, next) => {
  res.end('Dashboard A');
});

app.listen(9999, () => console.log('Web Server running on port 9999'));
