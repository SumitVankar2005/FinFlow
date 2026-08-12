const db = require("../config/db");

exports.getIncome = async (req, res) => {
  try {
    const userId = req.user.id;

    const { rows } = await db.query(
      "SELECT * FROM income WHERE user_id = $1 ORDER BY start_date DESC",
      [userId]
    );

    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addIncome = async (req, res) => {
  try {
    const userId = req.user.id;
    const { account_id, source_name, amount, frequency, start_date } = req.body;

    if (!account_id || !source_name || !amount || !start_date) {
      return res.status(400).json({ error: "account_id, source_name, amount and start_date are required" });
    }

    const result = await db.query(
      "INSERT INTO income (user_id, account_id, source_name, amount, frequency, start_date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING income_id",
      [userId, account_id, source_name, amount, frequency || "Monthly", start_date]
    );

    res.status(201).json({ message: "Income added", incomeId: result.rows[0].income_id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteIncome = async (req, res) => {
  try {
    const userId = req.user.id;
    const incomeId = req.params.id;

    const result = await db.query(
      "DELETE FROM income WHERE income_id = $1 AND user_id = $2",
      [incomeId, userId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Income not found" });
    }

    res.json({ message: "Income deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
