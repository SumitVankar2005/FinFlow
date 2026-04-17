const db = require("../config/db");

exports.getInvestments = async (req, res) => {
  try {
    const userId = req.user.id;

    const [rows] = await db.query(
      "SELECT * FROM Investments WHERE user_id = ? ORDER BY purchase_date DESC",
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

    const [result] = await db.query(
      `INSERT INTO Investments
        (user_id, account_id, investment_type, principal_amount, current_value, purchase_date, symbol_name, status, notes)
       VALUES (?, ?, ?, ?, ?, ?, ?, 'active', ?)`,
      [userId, account_id, investment_type, principal_amount, current_value || principal_amount, purchase_date, symbol_name || null, notes || null]
    );

    res.status(201).json({ message: "Investment added", investmentId: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteInvestment = async (req, res) => {
  try {
    const userId = req.user.id;
    const investmentId = req.params.id;

    const [result] = await db.query(
      "DELETE FROM Investments WHERE investment_id = ? AND user_id = ?",
      [investmentId, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Investment not found" });
    }

    res.json({ message: "Investment deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
