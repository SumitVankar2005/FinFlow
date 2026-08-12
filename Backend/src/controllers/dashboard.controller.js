const db = require("../config/db");

exports.getDashboard = async (req, res) => {
  try {

    const userId = req.user.id;

    const accountsResult = await db.query(
      "SELECT SUM(balance) AS \"totalBalance\" FROM accounts WHERE user_id = $1",
      [userId]
    );

    const incomeResult = await db.query(
      "SELECT SUM(amount) AS \"monthlyIncome\" FROM income WHERE user_id = $1",
      [userId]
    );

    const expensesResult = await db.query(
      `SELECT SUM(amount) AS "monthlyExpenses"
       FROM expenses
       WHERE user_id = $1
       AND EXTRACT(MONTH FROM expense_date) = EXTRACT(MONTH FROM CURRENT_DATE)
       AND EXTRACT(YEAR FROM expense_date) = EXTRACT(YEAR FROM CURRENT_DATE)`,
      [userId]
    );

    const investmentsResult = await db.query(
      "SELECT SUM(current_value) AS \"investmentValue\" FROM investments WHERE user_id = $1",
      [userId]
    );

    const totalBalance = accountsResult.rows[0].totalBalance || 0;
    const monthlyIncome = incomeResult.rows[0].monthlyIncome || 0;
    const monthlyExpenses = expensesResult.rows[0].monthlyExpenses || 0;
    const investmentValue = investmentsResult.rows[0].investmentValue || 0;

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
