const express = require('express');
const userRoutes = require('./user.routes');
const menuRoutes = require('./menu.routes');
const sessionRoutes = require('./session.routes');
const authRoutes = require('./auth.routes')
const configRoutes = require('./config.routes')

const router = express.Router();

router.use('/users', userRoutes);
router.use('/menu', menuRoutes);
router.use('/sessions', sessionRoutes);
router.use('/auth', authRoutes)
router.use('/config', configRoutes)

module.exports = router;
