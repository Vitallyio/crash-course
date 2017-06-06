import * as express from 'express';
import * as webpack from 'webpack';
import * as path from 'path';
import * as  middleware from 'webpack-dev-middleware';
import * as hotMiddleware from 'webpack-hot-middleware';
import config from '../webpack.config.js';

const open = require('open');

/* tslint:disable no-console */

const port = 3000;
const app = express();

const compiler = webpack(config);

app.use(middleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(hotMiddleware(compiler, {
  log: console.log,
  path: `${config.output.publicPath}__webpack_hmr`,
  heartbeat: 10 * 1000
}));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../src/index.html'));
});

app.listen(port, (err: Error) => {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});
