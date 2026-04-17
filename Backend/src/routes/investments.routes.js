const express = require("express");
const router = express.Router();
const db = require("../config/db");
const auth = require("../middleware/auth.middleware");
const investmentController = require("../controllers/investments.controller");

// GET /api/investments
router.get("/", auth, investmentController.getInvestments);

// POST /api/investments
router.post("/", auth, investmentController.addInvestment);

// DELETE /api/investments/:id
router.delete("/:id", auth, investmentController.deleteInvestment);

module.exports = router;
