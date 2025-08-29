const express = require('express');
const { login, unblockUser } = require('../controllers/authController');
const { verifyTokenController } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/login', login);

router.post('/unblock', authMiddleware, unblockUser);
router.get('/verify', authMiddleware, verifyTokenController);

module.exports = router;
