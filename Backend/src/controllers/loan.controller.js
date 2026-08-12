const db = require("../config/db");

exports.getLoans = async (req, res) => {
  try {
    const userId = req.user.id;

    const { rows } = await db.query(
      "SELECT * FROM loans_purchases WHERE user_id = $1 ORDER BY start_date DESC",
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

    const result = await db.query(
      `INSERT INTO loans_purchases
        (user_id, account_id, type, item, principal_amount, outstanding_balance, monthly_emi, interest_rate, start_date, end_date, next_due_date, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, 'active')
       RETURNING loan_id`,
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

    res.status(201).json({ message: "Loan added", loanId: result.rows[0].loan_id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteLoan = async (req, res) => {
  try {
    const userId = req.user.id;
    const loanId = req.params.id;

    const result = await db.query(
      "DELETE FROM loans_purchases WHERE loan_id = $1 AND user_id = $2",
      [loanId, userId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Loan not found" });
    }

    res.json({ message: "Loan deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
