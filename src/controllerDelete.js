const request = require('request');
const credentials = require('../credentials.js');

function deleteMessage(req, res) {
  const messageId = req.params.msgId;
  const url = `https://${credentials.sidLive}:${credentials.liveToken}@api.twilio.com/2010-04-01/Accounts/${credentials.sidLive}/Messages/${messageId}`;

  request.delete({ uri: url }, (error, response) => {
    if (error) {
      console.log('error:', error);
      res.status(500).send(error);
    } else {
      console.log(JSON.stringify(response, null, 2));
      res.status(200).send(response);
    }
  });
}

module.exports = {
  deleteMessage,
};
