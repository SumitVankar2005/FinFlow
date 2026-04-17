const db = require("../config/db");

exports.getBudgets = async (req, res) => {
  try {
    const userId = req.user.id;

    const [rows] = await db.query(
      "SELECT * FROM Budgets WHERE user_id = ? ORDER BY period_start DESC",
      [userId]
    );

    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addBudget = async (req, res) => {
  try {
    const userId = req.user.id;
    const { category, allocated_amount, period_start } = req.body;

    if (!category || !allocated_amount) {
      return res.status(400).json({ error: "category and allocated_amount are required" });
    }

    const [result] = await db.query(
      "INSERT INTO Budgets (user_id, category, allocated_amount, period_start, annual_spent) VALUES (?, ?, ?, ?, 0)",
      [userId, category, allocated_amount, period_start || new Date().toISOString().slice(0, 10)]
    );

    res.status(201).json({ message: "Budget added", budgetId: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteBudget = async (req, res) => {
  try {
    const userId = req.user.id;
    const budgetId = req.params.id;

    const [result] = await db.query(
      "DELETE FROM Budgets WHERE budget_id = ? AND user_id = ?",
      [budgetId, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Budget not found" });
    }

    res.json({ message: "Budget deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
