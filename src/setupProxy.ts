import createProxyMiddleware from 'http-proxy-middleware';
module.exports = function(app: any) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: process.env.AMENA_API_PATH,
      changeOrigin: true,
    })
  );
};