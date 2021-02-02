import proxy from 'http-proxy-middleware';

module.exports = function(app: any) {
  app.use(
    '/api/*',
    proxy({
      target: 'http://localhost:5000',
      changeOrigin: true,
    })
  )
}