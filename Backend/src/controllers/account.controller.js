const db = require("../config/db");

exports.getAccounts = async (req, res) => {
  try {
    const userId = req.user.id;
    const [rows] = await db.query(
      "SELECT * FROM Accounts WHERE user_id = ?",
      [userId]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addAccount = async (req, res) => {
  try {
    const userId = req.user.id;
    const { account_type, balance, bank_name, account_number } = req.body;

    if (!account_type || !bank_name || !account_number) {
      return res.status(400).json({ error: "account_type, bank_name and account_number are required" });
    }

    await db.query(
      "INSERT INTO Accounts (user_id, account_type, balance, bank_name, account_number) VALUES (?, ?, ?, ?, ?)",
      [userId, account_type, balance || 0, bank_name, account_number]
    );

    res.json({ message: "Account added successfully" });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(400).json({ error: "Account number already exists" });
    }
    res.status(500).json({ error: err.message });
  }
};

exports.updateAccount = async (req, res) => {
  try {
    const accountId = req.params.id;
    const userId = req.user.id;
    const { account_type, balance, bank_name } = req.body;

    const [result] = await db.query(
      "UPDATE Accounts SET account_type = ?, balance = ?, bank_name = ? WHERE account_id = ? AND user_id = ?",
      [account_type, balance, bank_name, accountId, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Account not found" });
    }

    res.json({ message: "Account updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    const accountId = req.params.id;
    const userId = req.user.id;

    const [result] = await db.query(
      "DELETE FROM Accounts WHERE account_id = ? AND user_id = ?",
      [accountId, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Account not found" });
    }

    res.json({ message: "Account deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
