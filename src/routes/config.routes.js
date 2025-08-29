const express = require("express");
const router = express.Router();
const { setMaxLoginAttempts } = require("../controllers/configController");
const authMiddleware = require("../middlewares/authMiddleware");

router.put("/max-login-attempts", authMiddleware, setMaxLoginAttempts);

module.exports = router;
