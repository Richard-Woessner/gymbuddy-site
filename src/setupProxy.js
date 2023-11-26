const { createProxyMiddleware } = require('http-proxy-middleware');

function settings(app) {
  /**
   * data from json-server: 'http://localhost:3001'
   * data from project BE dev: 'http://xxx.xxx.x.xxx'
   */
  app.use(
    createProxyMiddleware('/api', {
      target: 'http://localhost:3001',
      changeOrigin: true,
    }),
  );
}

module.exports = settings;
