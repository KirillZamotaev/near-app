// @ts-ignore
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/address/*',
    createProxyMiddleware({
      target: 'https://testnet.nearblocks.io/address/',
      changeOrigin: true,
    })
  );
};
