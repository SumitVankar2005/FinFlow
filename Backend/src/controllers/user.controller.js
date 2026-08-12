const db = require("../config/db");

exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { rows } = await db.query(
      "SELECT user_id, name, email, phone, reg_date, address FROM users WHERE user_id = $1",
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
      "UPDATE users SET name = $1, phone = $2, address = $3 WHERE user_id = $4",
      [name, phone, address, userId]
    );

    res.json({ message: "Profile updated successfully" });
  } catch (err) {
    if (err.code === "23505") {
      return res.status(400).json({ error: "Phone number already in use" });
    }
    res.status(500).json({ error: err.message });
  }
};
