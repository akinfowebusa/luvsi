const express = require('express');
const router = express.Router();
const dislikeController = require('../controllers/dislikeController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, dislikeController.dislikeUser);

module.exports = router;
