const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const expenseController = require("../controllers/expense.controller");

// GET /api/expenses
router.get("/", auth, expenseController.getExpenses);

// POST /api/expenses
router.post("/", auth, expenseController.addExpense);

// DELETE /api/expenses/:id
router.delete("/:id", auth, expenseController.deleteExpense);

module.exports = router;
