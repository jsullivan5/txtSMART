const request = require('request');
const config = require('./util/config');
const logger = require('./util/logger');

function deleteMessage(req, res) {
  const messageId = req.params.msgId;
  const url = `https://${config.twilioSID}:${config.twilioToken}@api.twilio.com/2010-04-01/Accounts/${config.twilioSID}/Messages/${messageId}`;

  request.delete({ uri: url }, (error, response) => {
    if (error) {
      logger.error('error:', error);
      res.status(500).send(error);
    } else {
      logger.debug(JSON.stringify(response, null, 2));
      res.status(200).send(response);
    }
  });
}

module.exports = {
  deleteMessage,
};
