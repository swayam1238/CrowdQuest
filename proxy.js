const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

// Add CORS headers to all responses
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin) {
    res.header('Access-Control-Allow-Origin', origin); // Echo the request origin
  }
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, api_key');
  res.header('Access-Control-Allow-Credentials', 'true'); // Allow credentials
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Proxy all requests to the email API
app.use('/', createProxyMiddleware({
  target: 'https://emailapi.netcorecloud.net',
  changeOrigin: true,
}));

app.listen(4000, () => {
  console.log('Proxy running on http://localhost:4000');
}); 