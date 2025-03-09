const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const messageController = require('../controllers/messageController');

router.post('/messages', authMiddleware, messageController.sendMessage);

router.get('/messages/:receiverId', authMiddleware, messageController.getMessages);

module.exports = router;
