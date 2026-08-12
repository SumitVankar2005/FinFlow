const db = require("../config/db");

exports.getBudgets = async (req, res) => {
  try {
    const userId = req.user.id;

    const { rows } = await db.query(
      "SELECT * FROM budgets WHERE user_id = $1 ORDER BY period_start DESC",
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

    const result = await db.query(
      "INSERT INTO budgets (user_id, category, allocated_amount, period_start, annual_spent) VALUES ($1, $2, $3, $4, 0) RETURNING budget_id",
      [userId, category, allocated_amount, period_start || new Date().toISOString().slice(0, 10)]
    );

    res.status(201).json({ message: "Budget added", budgetId: result.rows[0].budget_id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteBudget = async (req, res) => {
  try {
    const userId = req.user.id;
    const budgetId = req.params.id;

    const result = await db.query(
      "DELETE FROM budgets WHERE budget_id = $1 AND user_id = $2",
      [budgetId, userId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Budget not found" });
    }

    res.json({ message: "Budget deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
