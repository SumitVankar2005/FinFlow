const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const dashboardController = require("../controllers/dashboard.controller");

// GET /api/dashboard
router.get("/", auth, dashboardController.getDashboard);

module.exports = router;
