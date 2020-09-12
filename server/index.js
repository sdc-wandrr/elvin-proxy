require('newrelic');
const express = require('express');
const path = require('path');
const { createProxyMiddleware }= require('http-proxy-middleware');
const app = express();
const PORT = 3030;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
app.use('/hostels/:hostel_id', express.static(path.join(__dirname, '../public')));
app.use((req, res, next) => {
  console.log(`${req.method} on ${req.path}:`, req.params, req.body);
  next();
});

// API reroutes

// Image carousel service
app.use('/api/hostels/:hostel_id/images', createProxyMiddleware({ target: 'http://3.101.103.127', changeOrigin: true }));
// availability service
// app.use('/api/hostel/:hostelId/rooms', createProxyMiddleware({ target: 'http://localhost:3009', changeOrigin: true }));
// description map rules service
app.use('/api/house/:id', createProxyMiddleware({ target: 'http://172.31.30.173', changeOrigin: true }));
app.use('/api/house/:id/hostel', createProxyMiddleware({ target: 'http://172.31.30.173', changeOrigin: true }));
app.use('/api/house/:id/description', createProxyMiddleware({ target: 'http://172.31.30.173', changeOrigin: true }));
app.use('/api/house/:id/rules', createProxyMiddleware({ target: 'http://172.31.30.173', changeOrigin: true }));
app.use('/api/house/:id/address', createProxyMiddleware({ target: 'http://172.31.30.173', changeOrigin: true }));
// reviews service
app.use('/hostels/:id/api/reviews', createProxyMiddleware({ target: 'http://100.26.204.252:3001', changeOrigin: true }));

app.listen(PORT, () => console.log('Proxy Server listening on port ', PORT));
