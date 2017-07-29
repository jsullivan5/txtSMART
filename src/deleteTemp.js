var request = require('request')
var twilio = require('twilio');
var credentials = require('../credentials.js');
var http = require('http');


function tryDelete(messageSid) {
  var client = require('twilio')(credentials.sidLive, credentials.liveToken);
  client.messages(messageSid).get()
    .then((message) => {
      if (message.status === "received") {
        client.messages(messageSid).delete()
          .then(() => console.log("Message deleted"))
          .catch((err) => console.error(err));
      } else {
        setTimeout(() => tryDelete(messageSid), 1000);
      }
    })
    .catch((err) => console.error(err));
}


tryDelete("SMf1109c596d5e6c3525493b9241f59b51")
