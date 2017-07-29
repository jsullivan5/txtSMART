var request = require('request')
var twilio = require('twilio');
var credentials = require('../credentials.js');
var http = require('http');

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
        from: data.from,
        tone: '',
        toneView: false
      })

    }).catch(function(err) {
      console.error('Could not notify administrator');
      console.error(err);
    });
}

function getHistory(req, res) {
  var client = require('twilio')(credentials.sidLive, credentials.liveToken);
  client.messages.list().then((data) => {
    var messages =  data.map(function(message, index, array) {
      return {
        id: array.length - index,
        body: message.body,
        to: message.to,
        from: message.from,
        tone: '',
        toneView: false,
        smsId: message.sid

      }
    })

    res.status(200).send(messages)
  })
}

module.exports = {
  sendSms: sendSms,
  getHistory: getHistory
};
