var express = require('express');
var router = express.Router();
var controller = require('./controller');
var Watson = require('./controllerWatson');
var controllerDelete = require('./controllerDelete');
var http = require('http');

router.post('/tone/:content', Watson.getTone);
router.get('/send/:content', controller.sendSms);
router.get('/history', controller.getHistory);
router.delete('/delete/:msgId', controllerDelete.deleteMessage);

module.exports = router;
