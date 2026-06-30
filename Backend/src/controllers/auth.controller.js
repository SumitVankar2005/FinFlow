const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { name, email, phone, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "name, email and password are required" });
  }

  if (!phone) {
    return res.status(400).json({ error: "Phone number is required" });
  }

  try {
    const hashed = await bcryptjs.hash(password, 10);

    await db.query(
      "INSERT INTO Users (name, email, phone, password, reg_date) VALUES (?, ?, ?, ?, CURDATE())",
      [name, email, phone, hashed]
    );

    return res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(400).json({ error: "Email or phone already registered" });
    }
    return res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const [rows] = await db.query(
      "SELECT user_id, name, email, phone, password FROM Users WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: "User not found" });
    }

    const user = rows[0];

    const isMatch = await bcryptjs.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Wrong password" });
    }

    const token = jwt.sign(
      { id: user.user_id },
      process.env.JWT_SECRET || "finflowsecret",
      { expiresIn: "7d" }
    );

    const { password: _, ...safeUser } = user;

    res.json({
      message: "Login successful",
      token,
      user: safeUser
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
