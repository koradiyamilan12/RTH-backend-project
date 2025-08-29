const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/sessionController');
const authMiddleware = require('../middlewares/authMiddleware');
const { getSession, getSessionById, createSession, updateSession, deleteSession } = sessionController;

router.get('/', authMiddleware, getSession);
router.post('/', authMiddleware, createSession);

router.get('/:id', authMiddleware, getSessionById);
router.put('/:id', authMiddleware, updateSession);
router.delete('/:id', authMiddleware, deleteSession);

module.exports = router;