const mysql = require("mysql2/promise");

const pool = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});

pool.connect((err) => {
  if (err) {
    console.log("DB Connection Failed:", err);
  } else {
    console.log("DB Connected ✅");
  }
});
module.exports = pool;