var express = require('express');
var router = express.Router();
var controller = require('./controller');
var Watson = require('./controllerWatson')
var http = require('http');


router.post('/tone', Watson.getTone)
router.get('/send/:content', controller.sendSms)
router.get('/history', controller.getHistory)

module.exports = router;
