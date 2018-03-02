/* eslint global-require: 0 */
/* eslint import/no-extraneous-dependencies: 0 */
require('dotenv').config();

const path = require('path');
const express = require('express');
const cors = require('express-cors');
const bodyParser = require('body-parser');
const logger = require('./util/logger');
const config = require('./util/config');

const app = express();
const router = require('./router');
const http = require('http');
const watson = require('./controllerWatson');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webPackConfig = require('../webpack.config.js');
  const compiler = webpack(webPackConfig);

  app.use(webpackHotMiddleware(compiler));
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webPackConfig.output.publicPath,
  }));
}

// WebSockets for Incoming Text
const server = http.createServer(app)
  .listen(config.port, () => {
    logger.info(`Listening on port ${config.port}.`);
  });

const io = require('socket.io')(server);

app.post('/sms', (request, response) => {
  io.sockets.emit('message', request.body);
  watson.getToneServer(request.body, response);
});

app.use('/assets', express.static(path.join(__dirname, '../app/assets')));

app.get('/', (req, res) => { res.sendFile(path.join(__dirname, '/../index.html')); });

app.use('/api', router);
app.get('/*', (req, res) => { res.sendFile(path.join(__dirname, '/../index.html')); });

module.exports = server;
