var request = require('request')
var twilio = require('twilio');
var credentials = require('../credentials.js');
var http = require('http');


var BASE_URL = 'http://api.icndb.com/jokes/random'

function test(req, res, next) {
  request(BASE_URL, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.send(body)
    }
  })
}

function sendSms(req, res) {
  var messageContent = req.params.content
  var client = require('twilio')(credentials.sidLive, credentials.liveToken);

  client.api.messages
    .create({
      body: messageContent,
      to: '+12146210523',
      from: '+18178732313',
    }).then(function(data) {
      console.log('Administrator notified');

      res.status(200).send({
        body: data.body,
        to: data.to,
        from: data.from
      })
      
    }).catch(function(err) {
      console.error('Could not notify administrator');
      console.error(err);
    });
}

function getHistory(req, res) {
  var client = require('twilio')(credentials.sidLive, credentials.liveToken);

  client.messages.list().then((data) => {
    var messages =  data.map(function(message) {
      return {
        body: message.body,
        to: message.to,
        from: message.from
      }
    })

    res.status(200).send(messages)
  })
}

function getTone(req, res) {
  var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');

  var tone_analyzer = new ToneAnalyzerV3({
    username: credentials.watsonCred.username,
    password: credentials.watsonCred.password,
    version_date: '2017-07-01'
  });

  var params = {
    text: 'You son of a bitch!',
    tones: 'emotion'
  };

  tone_analyzer.tone(params, function(error, response) {
    if (error) {
      console.log('error:', error);
      res.status(500).send(error)
    }
    else {
      console.log(JSON.stringify(response, null, 2));
      res.status(200).send(response)
    }
  });
}

module.exports = {
  test: test,
  sendSms: sendSms,
  getHistory: getHistory,
  getTone: getTone
};
