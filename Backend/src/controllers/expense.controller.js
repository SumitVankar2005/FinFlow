const db = require("../config/db");

exports.getExpenses = async (req, res) => {
  try {
    const userId = req.user.id;
    const [rows] = await db.query(
      "SELECT * FROM expenses WHERE user_id = ? ORDER BY expense_date DESC",
      [userId]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addExpense = async (req, res) => {
  try {
    const userId = req.user.id;
    const { account_id, category, amount, expense_date, description } = req.body;

    if (!account_id || !category || !amount || !expense_date) {
      return res.status(400).json({ error: "account_id, category, amount and expense_date are required" });
    }

    await db.query(
      `INSERT INTO expenses (user_id, account_id, category, amount, expense_date, description)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [userId, account_id, category, amount, expense_date, description || null]
    );

    res.json({ message: "Expense added successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const userId = req.user.id;
    const [result] = await db.query(
      "DELETE FROM expenses WHERE expense_id = ? AND user_id = ?",
      [req.params.id, userId]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Expense not found" });
    }
    res.json({ message: "Expense deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
