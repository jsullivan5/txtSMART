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


  var server = http.createServer(app)
                   .listen(port, () => {
                      console.log(`Listening on port ${port}.`);
                    });

  var io = require('socket.io')(server);


  io.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
      console.log(data);
    });
  });

  app.use(webpackHotMiddleware(compiler));
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));
}

var newMessage;

app.post("/sms", function (request, response) {
  console.log('/sms firing');
  console.log(request.body.Body);
  console.log(request.body);
  io.sockets.emit('message', request.body);
  // io.on('connection', function (socket) {
  //   socket.emit('message', { message: request.body });
  //   socket.on('my other event', function (data) {
  //     console.log(data);
  //   });
  // });

  // newMessage = request.body

  //do stuff
  response.status(200).send(`<Response></Response>`)
});

app.use('/assets', express.static(path.join(__dirname, '../app/assets')));

app.get('/', function (req, res) { res.sendFile(path.join(__dirname, '/../index.html')) });

app.use('/api', router);
app.get('/*', function (req, res) { res.sendFile(path.join(__dirname, '/../index.html')) });

// app.listen(port);

//Setting up web socket


// io.on('connection', (socket) => {
//   console.log('A user has connected.');
// });


console.log(`Listening at http://localhost:${port}`);

module.exports = server;
