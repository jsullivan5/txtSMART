var client = require('twilio')('ACe00cc2353f5a426cdbe7c1c20755c839', '18bf59785ff0283483b56b47257e3674');

client.messages.list(function(err, data) {
    data.map(function(message) {
        console.log(message.body);
    });
});
