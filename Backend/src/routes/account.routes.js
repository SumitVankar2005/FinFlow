const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const accountController = require("../controllers/account.controller");

// GET /api/accounts
router.get("/", auth, accountController.getAccounts);

// POST /api/accounts
router.post("/", auth, accountController.addAccount);

// PUT /api/accounts/:id
router.put("/:id", auth, accountController.updateAccount);

// DELETE /api/accounts/:id
router.delete("/:id", auth, accountController.deleteAccount);

module.exports = router;
