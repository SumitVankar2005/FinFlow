require("dotenv").config();
const app = require("./app");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`FinFlow server running on port ${PORT}`);
  console.log(`Database: ${process.env.DB_NAME} on ${process.env.DB_HOST}`);
});
