const db = require("../config/db");

exports.getSubscriptions = async (req, res) => {
  try {
    const userId = req.user.id;

    const { rows } = await db.query(
      "SELECT * FROM subscriptions WHERE user_id = $1 ORDER BY renewal_date ASC",
      [userId]
    );

    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addSubscription = async (req, res) => {
  try {
    const userId = req.user.id;
    const { account_id, service_provider, plan_name, monthly_cost, renewal_date, status } = req.body;

    if (!account_id || !service_provider || !monthly_cost) {
      return res.status(400).json({ error: "account_id, service_provider and monthly_cost are required" });
    }

    const result = await db.query(
      "INSERT INTO subscriptions (user_id, account_id, service_provider, plan_name, monthly_cost, renewal_date, status) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING subscription_id",
      [userId, account_id, service_provider, plan_name || "Standard", monthly_cost, renewal_date || null, status || "active"]
    );

    res.status(201).json({ message: "Subscription added", subscriptionId: result.rows[0].subscription_id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteSubscription = async (req, res) => {
  try {
    const userId = req.user.id;
    const subscriptionId = req.params.id;

    const result = await db.query(
      "DELETE FROM subscriptions WHERE subscription_id = $1 AND user_id = $2",
      [subscriptionId, userId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Subscription not found" });
    }

    res.json({ message: "Subscription deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
