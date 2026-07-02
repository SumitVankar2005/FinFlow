const mysql = require("mysql2");

const pool = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

pool.connect((err) => {
  if (err) {
    console.log("DB Connection Failed:", err);
  } else {
    console.log("DB Connected ✅");
  }
});
module.exports = pool;