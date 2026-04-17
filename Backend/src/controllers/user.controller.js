const db = require("../config/db");

exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const [rows] = await db.query(
      "SELECT user_id, name, email, phone, reg_date, address FROM Users WHERE user_id = ?",
      [userId]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, phone, address } = req.body;

    await db.query(
      "UPDATE Users SET name = ?, phone = ?, address = ? WHERE user_id = ?",
      [name, phone, address, userId]
    );

    res.json({ message: "Profile updated successfully" });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(400).json({ error: "Phone number already in use" });
    }
    res.status(500).json({ error: err.message });
  }
};
