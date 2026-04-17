# FinFlow - Personal Finance Management

A full-stack personal finance management application for tracking income, expenses, budgets, investments, loans, and subscriptions.

## Tech Stack

- **Backend**: Node.js, Express, MySQL
- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Authentication**: JWT tokens
- **Password Hashing**: bcrypt

## Project Structure

```
FinFlow/
├── Backend/
│   ├── src/
│   │   ├── controllers/     # Request handlers
│   │   ├── routes/          # API route definitions
│   │   ├── middleware/      # Auth middleware
│   │   ├── config/          # Database connection
│   │   ├── app.js           # Express app setup
│   │   └── server.js        # Server entry point
│   ├── .env.example
│   └── package.json
├── Database/
│   ├── schema.sql           # Database schema
│   └── sample_data.sql      # Sample data for testing
└── Frontend/
    ├── index.html           # Entry point (redirects)
    ├── login.html           # Login page
    ├── createAccount.html   # Registration page
    ├── dashboard.html       # Main dashboard
    └── FinFlow.html         # Landing page
```

## Setup Instructions

### 1. Database Setup

```bash
# Login to MySQL
mysql -u root -p

# Run schema
source /give full address/Database/schema.sql

# Load sample data
source /give full address/Database/sample_data.sql
```

### 2. Backend Setup

```bash
cd Backend

# Install dependencies
npm install

# Start server
npm run dev     # Development with nodemon
npm start       # Production
```

### 3. Frontend Setup

Open `Frontend/index.html` or `Frontend/login.html` in a browser.

Or serve with a static server:
```bash
cd Frontend
npx serve
```

## Default Test Credentials

After loading sample_data.sql:

| Email | Password |
|-------|----------|
| aarav.mehta@gmail.com | 123456 |
| sneha.iyer@gmail.com | 123456 |
| rohan.kulkarni@gmail.com | 123456 |

## Features

- **Dashboard**: Overview of total balance, income, expenses, net worth
- **Accounts**: Track multiple bank accounts
- **Income**: Record income sources with frequency
- **Expenses**: Log expenses by category
- **Budgets**: Set and track category budgets
- **Investments**: Track stocks, mutual funds, ETFs, etc.
- **Loans**: Monitor loans and EMIs
- **Subscriptions**: Track recurring subscriptions with renewal alerts

## Security Notes

- Change `JWT_SECRET` in `.env` before production
- Use HTTPS in production
- Never commit `.env` file
