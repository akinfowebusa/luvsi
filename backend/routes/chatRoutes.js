const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const {authenticate} = require('../middleware/authMiddleware');

router.post('/send',authenticate,chatController.sendMessage);
router.get('/conversation', authenticate,chatController.getConversation);
router.get('/conversations', authenticate,chatController.getConversationList);
router.post('/mark-read', authenticate, chatController.markAsRead);
router.delete('/conversation/:chatId', authenticate, chatController.deleteConversation);

module.exports = router;