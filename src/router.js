var express = require('express');
var router = express.Router();
var controller = require('./controller');
var http = require('http');


var credentials = require('../credentials.js');


router.post('/tone', controller.getTone)
router.get('/test', controller.test)
router.get('/send/:content', controller.sendSms)
router.get('/history', controller.getHistory)

module.exports = router;






// router.post("/sms", function (request, response) {
//   console.log(request.body.Body);
//   console.log(request.body.From);
//   response.send("<Response><Message>" + request.body.Body + "</Message></Response>");
// });

// router.post('/sms', function(req, res) {
//   console.log('post stuff');
//   var twilio = require('twilio')(credentials.sidLive, credentials.liveToken);
//   var twiml = new twilio.TwimlResponse();
//   twiml.message('The Robots are coming! Head for the hills!');
//   res.writeHead(200, {'Content-Type': 'text/xml'});
//   res.end(twiml.toString());
// });
