const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const { createUser, getUsers, getUserById, updateUser, deleteUser, paginatedUsers, upsertUser, bulkUpsertUsers, } = userController;

router.get("/:id", authMiddleware, getUserById);
router.put("/:id", authMiddleware, updateUser);
router.delete("/:id", authMiddleware, deleteUser);

router.get("/", authMiddleware, getUsers);
router.post("/", authMiddleware, createUser);

router.put("/upsert", authMiddleware, upsertUser);
router.put("/bulk-upsert", authMiddleware, bulkUpsertUsers);
router.post("/filter", authMiddleware, paginatedUsers);

module.exports = router;
