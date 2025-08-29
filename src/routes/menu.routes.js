const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');
const authMiddleware = require('../middlewares/authMiddleware');
const { getMenus, getMenuById, createMenu, updateMenu, deleteMenu, filterMenus } = menuController;

router.get('/', authMiddleware, getMenus);
router.post('/', createMenu);
router.post('/filter', authMiddleware, filterMenus);

router.get('/:id', authMiddleware, getMenuById);
router.put('/:id', authMiddleware, updateMenu);
router.delete('/:id', authMiddleware, deleteMenu);

module.exports = router;
