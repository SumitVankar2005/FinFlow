const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

// Middleware
app.use(cors({
  origin: "https://fin-flow-khaki.vercel.app",
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve frontend
app.use(express.static(path.join(__dirname, "../../Frontend")));

// Routes
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/dashboard", require("./routes/dashboard.routes"));
app.use("/api/accounts", require("./routes/account.routes"));
app.use("/api/expenses", require("./routes/expense.routes"));
app.use("/api/income", require("./routes/income.routes"));
app.use("/api/budgets", require("./routes/budget.routes"));
app.use("/api/investments", require("./routes/investments.routes"));
app.use("/api/loans", require("./routes/loan.routes"));
app.use("/api/subscriptions", require("./routes/subscription.routes"));
app.use("/api/users", require("./routes/user.routes"));

// Default route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../Frontend/index.html"));
});

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// 404
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

module.exports = app;