const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Test connection
pool.connect()
  .then(client => {
    console.log("DB Connected ✅");
    client.release();
  })
  .catch(err => {
    console.error("DB Connection Failed:", err.message);
  });

module.exports = pool;