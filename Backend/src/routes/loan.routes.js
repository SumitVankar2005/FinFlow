const express = require("express");
const router = express.Router();
const db = require("../config/db");
const auth = require("../middleware/auth.middleware");
const loanController = require("../controllers/loan.controller");

// GET /api/loans
router.get("/", auth, loanController.getLoans);

// POST /api/loans
router.post("/", auth, loanController.addLoan);

// DELETE /api/loans/:id
router.delete("/:id", auth, loanController.deleteLoan);

module.exports = router;
