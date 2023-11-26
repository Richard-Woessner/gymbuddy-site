const jsonServer = require('json-server');
const path = require('path');

const data = require('./data');
const routerRewrite = require('./router-rewrite.json');

const server = jsonServer.create();
const router = jsonServer.router(data);
const middlewares = jsonServer.defaults();
process.stdout.write(`data from: ${path.join(__dirname, 'data')}\n`);

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.method = 'GET';
    req.query = req.body;
  }
  next();
});
server.use(jsonServer.rewriter(routerRewrite));

server.use(router);
router.render = (req, res) => {
  switch (res.statusCode) {
    case 404:
      res.jsonp(
        `please create '${req.url.replace(/\//g, '')}.json' in ${path.join(
          __dirname,
          'data',
        )}`,
      );
      break;
    default:
      res.jsonp(res.locals.data);
      break;
  }
};
server.listen(3001, () => {
  process.stdout.write('JSON Server is running\n');
});
