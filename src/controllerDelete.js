var request = require('request');
var credentials = require('../credentials.js');

function deleteMessage(req, res) {
  var messageId = req.params.msgId;
  var url = `https://${credentials.sidLive}:${credentials.liveToken}@api.twilio.com/2010-04-01/Accounts/${credentials.sidLive}/Messages/${messageId}`;

  request.delete({ uri: url }, function(error, response) {
    if (error) {
      console.log('error:', error);
      res.status(500).send(error);
    }
    else {
      console.log(JSON.stringify(response, null, 2));
      res.status(200).send(response);
    }
  });
}



module.exports = {
  deleteMessage: deleteMessage
};
