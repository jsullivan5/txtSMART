/* eslint global-require: 0 */
const config = require('./util/config');

function sendSms(req, res) {
  const messageContent = req.params.content;
  const client = require('twilio')(config.twilioSID, config.twilioToken);

  client.api.messages
    .create({
      body: messageContent,
      to: '+12146210523',
      from: '+18178732313',
    }).then((data) => {
      console.log('Administrator notified');

      res.status(200).send({
        body: data.body,
        to: data.to,
        from: data.from,
        tone: '',
        toneView: false,
      });
    }).catch((err) => {
      console.error('Could not notify administrator', err);
    });
}

function getHistory(req, res) {
  const client = require('twilio')(config.twilioSID, config.twilioToken);
  client.messages.list().then((data) => {
    const messages = data.map((message, index, array) => ({
      id: array.length - index,
      body: message.body,
      to: message.to,
      from: message.from,
      tone: '',
      toneView: false,
      smsId: message.sid,
    }));

    res.status(200).send(messages);
  });
}

module.exports = {
  sendSms,
  getHistory,
};
