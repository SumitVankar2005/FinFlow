const express = require("express");
const router = express.Router();
const db = require("../config/db");
const auth = require("../middleware/auth.middleware");
const incomeController = require("../controllers/income.controller");

// GET /api/income
router.get("/", auth, incomeController.getIncome);

// POST /api/income
router.post("/", auth, incomeController.addIncome);

// DELETE /api/income/:id
router.delete("/:id", auth, incomeController.deleteIncome);

module.exports = router;
