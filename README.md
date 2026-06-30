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
mysql -u root -p < Database/schema.sql

# (Optional) Load sample data
mysql -u root -p < Database/sample_data.sql
```

### 2. Backend Setup

```bash
cd Backend

# Copy environment file
cp .env.example .env

# Edit .env with your database credentials
# DB_HOST=localhost
# DB_USER=root
# DB_PASS=your_password
# DB_NAME=finance_db

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

## API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | User login | No |
| GET | `/api/dashboard` | Get dashboard metrics | Yes |
| GET | `/api/accounts` | List accounts | Yes |
| POST | `/api/accounts` | Add account | Yes |
| DELETE | `/api/accounts/:id` | Delete account | Yes |
| GET | `/api/income` | List income sources | Yes |
| POST | `/api/income` | Add income | Yes |
| DELETE | `/api/income/:id` | Delete income | Yes |
| GET | `/api/expenses` | List expenses | Yes |
| POST | `/api/expenses` | Add expense | Yes |
| DELETE | `/api/expenses/:id` | Delete expense | Yes |
| GET | `/api/budgets` | List budgets | Yes |
| POST | `/api/budgets` | Set budget | Yes |
| DELETE | `/api/budgets/:id` | Delete budget | Yes |
| GET | `/api/investments` | List investments | Yes |
| POST | `/api/investments` | Add investment | Yes |
| DELETE | `/api/investments/:id` | Delete investment | Yes |
| GET | `/api/loans` | List loans | Yes |
| POST | `/api/loans` | Add loan | Yes |
| DELETE | `/api/loans/:id` | Delete loan | Yes |
| GET | `/api/subscriptions` | List subscriptions | Yes |
| POST | `/api/subscriptions` | Add subscription | Yes |
| DELETE | `/api/subscriptions/:id` | Delete subscription | Yes |
| GET | `/api/users/me` | Get user profile | Yes |
| PUT | `/api/users/me` | Update profile | Yes |

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
