const db = require("../config/db");

exports.getInvestments = async (req, res) => {
  try {
    const userId = req.user.id;

    const { rows } = await db.query(
      "SELECT * FROM investments WHERE user_id = $1 ORDER BY purchase_date DESC",
      [userId]
    );

    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addInvestment = async (req, res) => {
  try {
    const userId = req.user.id;
    const { account_id, investment_type, symbol_name, principal_amount, current_value, purchase_date, notes } = req.body;

    if (!account_id || !investment_type || !principal_amount || !purchase_date) {
      return res.status(400).json({ error: "account_id, investment_type, principal_amount and purchase_date are required" });
    }

    const result = await db.query(
      `INSERT INTO investments
        (user_id, account_id, investment_type, principal_amount, current_value, purchase_date, symbol_name, status, notes)
       VALUES ($1, $2, $3, $4, $5, $6, $7, 'active', $8)
       RETURNING investment_id`,
      [userId, account_id, investment_type, principal_amount, current_value || principal_amount, purchase_date, symbol_name || null, notes || null]
    );

    res.status(201).json({ message: "Investment added", investmentId: result.rows[0].investment_id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteInvestment = async (req, res) => {
  try {
    const userId = req.user.id;
    const investmentId = req.params.id;

    const result = await db.query(
      "DELETE FROM investments WHERE investment_id = $1 AND user_id = $2",
      [investmentId, userId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Investment not found" });
    }

    res.json({ message: "Investment deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
