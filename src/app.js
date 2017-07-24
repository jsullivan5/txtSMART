// const Server = require('./server');
var path = require('path');
var express = require('express');
var cors = require('express-cors');
var bodyParser = require('body-parser')
var port = (process.env.PORT || 3000);
var app = express();
var router = require('./router');
var session = require('express-session');
var twilio = require('twilio');
var http = require('http');




app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({ secret: 'anything-you-want-but-keep-secret',
                  resave: true,
                  saveUninitialized: true
                }));


if (process.env.NODE_ENV !== 'production') {
  var webpack = require('webpack');
  var webpackDevMiddleware = require('webpack-dev-middleware');
  var webpackHotMiddleware = require('webpack-hot-middleware');
  var config = require('../webpack.config.js');
  var compiler = webpack(config);


  app.use(webpackHotMiddleware(compiler));
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));
}


//WebSockets for Incoming Text
var server = http.createServer(app)
                 .listen(port, () => {
                    console.log(`Listening on port ${port}.`);
                  });

var io = require('socket.io')(server);


app.post("/sms", function (request, response) {

  io.sockets.emit('message', request.body);

  response.status(200).send(`<Response></Response>`)
});

app.use('/assets', express.static(path.join(__dirname, '../app/assets')));

app.get('/', function (req, res) { res.sendFile(path.join(__dirname, '/../index.html')) });

app.use('/api', router);
app.get('/*', function (req, res) { res.sendFile(path.join(__dirname, '/../index.html')) });


console.log(`Listening at http://localhost:${port}`);

module.exports = server;
