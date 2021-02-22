const createProxyMiddleware = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: process.env.AMENA_API_PATH,
      changeOrigin: true,
    })
  );
};