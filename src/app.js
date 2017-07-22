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

// app.post('/sms', function(req, res) {
//
//   var message = 'Hello, thanks for the new message.';
//
//   var twiml = new twilio.TwimlResponse();
//   twiml.message(message);
//   res.writeHead(200, {'Content-Type': 'text/xml'});
//   res.end(twiml.toString());
// });


app.post("/sms", function (request, response) {
  console.log('/sms firing');
  console.log(request.body.Body);
  console.log(request.body);
  response.status(200).send(`<Response>
                  <Message>
                    This is an automated response: Suh Dude!
                  </Message>
                </Response>`)
});

app.use('/assets', express.static(path.join(__dirname, '../app/assets')));

app.get('/', function (req, res) { res.sendFile(path.join(__dirname, '/../index.html')) });

app.use('/api', router);
app.get('/*', function (req, res) { res.sendFile(path.join(__dirname, '/../index.html')) });

app.listen(port);


console.log(`Listening at http://localhost:${port}`);
