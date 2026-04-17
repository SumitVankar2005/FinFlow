const express = require("express");
const router = express.Router();
const db = require("../config/db");
const auth = require("../middleware/auth.middleware");
const subscriptionController = require("../controllers/subscription.controller");

// GET /api/subscriptions
router.get("/", auth, subscriptionController.getSubscriptions);

// POST /api/subscriptions
router.post("/", auth, subscriptionController.addSubscription);

// DELETE /api/subscriptions/:id
router.delete("/:id", auth, subscriptionController.deleteSubscription);

module.exports = router;
