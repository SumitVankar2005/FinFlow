const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const userController = require("../controllers/user.controller");

// GET /api/users/me
router.get("/me", auth, userController.getProfile);

// PUT /api/users/me
router.put("/me", auth, userController.updateProfile);

module.exports = router;
