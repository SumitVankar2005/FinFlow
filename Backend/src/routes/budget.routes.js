const express = require("express");
const router = express.Router();
const db = require("../config/db");
const auth = require("../middleware/auth.middleware");
const budgetController = require("../controllers/budget.controller");

// GET /api/budgets
router.get("/", auth, budgetController.getBudgets);

// POST /api/budgets
router.post("/", auth, budgetController.addBudget);

// DELETE /api/budgets/:id
router.delete("/:id", auth, budgetController.deleteBudget);

module.exports = router;
