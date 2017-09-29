const express = require('express');
const controller = require('./controller');
const Watson = require('./controllerWatson');
const controllerDelete = require('./controllerDelete');

const router = express.Router();

router.post('/tone/:content', Watson.getTone);
router.get('/send/:content', controller.sendSms);
router.get('/history', controller.getHistory);
router.delete('/delete/:msgId', controllerDelete.deleteMessage);

module.exports = router;
