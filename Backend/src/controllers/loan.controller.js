const db = require("../config/db");

exports.getLoans = async (req, res) => {
  try {
    const userId = req.user.id;

    const [rows] = await db.query(
      "SELECT * FROM Loans_Purchases WHERE user_id = ? ORDER BY start_date DESC",
      [userId]
    );

    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addLoan = async (req, res) => {
  try {
    const userId = req.user.id;
    const { account_id, type, item, principal_amount, outstanding_balance, monthly_emi, interest_rate, start_date, end_date, next_due_date } = req.body;

    if (!account_id || !type || !item || !principal_amount) {
      return res.status(400).json({ error: "account_id, type, item and principal_amount are required" });
    }

    const [result] = await db.query(
      `INSERT INTO Loans_Purchases
        (user_id, account_id, type, item, principal_amount, outstanding_balance, monthly_emi, interest_rate, start_date, end_date, next_due_date, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'active')`,
      [
        userId,
        account_id,
        type,
        item,
        principal_amount,
        outstanding_balance || principal_amount,
        monthly_emi || 0,
        interest_rate || 0,
        start_date || new Date().toISOString().slice(0, 10),
        end_date || null,
        next_due_date || null
      ]
    );

    res.status(201).json({ message: "Loan added", loanId: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteLoan = async (req, res) => {
  try {
    const userId = req.user.id;
    const loanId = req.params.id;

    const [result] = await db.query(
      "DELETE FROM Loans_Purchases WHERE loan_id = ? AND user_id = ?",
      [loanId, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Loan not found" });
    }

    res.json({ message: "Loan deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
