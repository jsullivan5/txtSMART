var credentials = require('../credentials.js');

var client = require('twilio')(credentials.sidLive, credentials.liveToken);
client.api.messages
  .create({
    body: 'hello from node, the machines have become sentient',
    to: '+12146210523',
    from: '+18178732313',
  }).then(function(data) {
    console.log('Administrator notified');
    return data
  }).catch(function(err) {
    console.error('Could not notify administrator');
    console.error(err);
  });
