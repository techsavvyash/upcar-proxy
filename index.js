require('dotenv').config();
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();


// Proxy middleware options
const proxyOptions = {
  target: 'https://upcar.up.gov.in/en/page/advisory', // target host
  changeOrigin: true, // needed for virtual hosted sites
  pathRewrite: (path, req) => {
    // Rewrite the path for the target
    const newPath = path.replace('/', '');
    return newPath;
  },
  onProxyReq: (proxyReq, req, res) => {
    // You can modify the proxy request here if needed
  },
  onProxyRes: (proxyRes, req, res) => {
    // You can modify the proxy response here if needed
  },
};

// Create the proxy
app.use('/', createProxyMiddleware(proxyOptions));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Reverse proxy server running on port ${PORT}`);
});
