const db = require("../config/db");

exports.getDashboard = async (req, res) => {
  try {

    const userId = req.user.id;

    const [accounts] = await db.query(
      "SELECT SUM(balance) AS totalBalance FROM Accounts WHERE user_id = ?",
      [userId]
    );

    const [income] = await db.query(
      "SELECT SUM(amount) AS monthlyIncome FROM Income WHERE user_id = ?",
      [userId]
    );

    const [expenses] = await db.query(
      `SELECT SUM(amount) AS monthlyExpenses
       FROM Expenses
       WHERE user_id = ?
       AND MONTH(expense_date) = MONTH(CURDATE())
       AND YEAR(expense_date) = YEAR(CURDATE())`,
      [userId]
    );

    const [investments] = await db.query(
      "SELECT SUM(current_value) AS investmentValue FROM Investments WHERE user_id = ?",
      [userId]
    );

    const totalBalance = accounts[0].totalBalance || 0;
    const monthlyIncome = income[0].monthlyIncome || 0;
    const monthlyExpenses = expenses[0].monthlyExpenses || 0;
    const investmentValue = investments[0].investmentValue || 0;

    const netWorth = Number(totalBalance) + Number(investmentValue);

    res.json({
      totalBalance,
      monthlyIncome,
      monthlyExpenses,
      netWorth
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Dashboard error" });
  }
};