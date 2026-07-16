# FinFlow - Personal Finance Management

A full-stack personal finance management application for tracking income, expenses, budgets, investments, loans, and subscriptions.

🔗 **Live Demo**: [fin-flow-two-nu.vercel.app](https://fin-flow-two-nu.vercel.app)

> Note: this is a student project built for learning purposes. Accounts, income, and expenses are entered manually (no real bank linking), and the free hosting tiers below may take a few seconds to "wake up" on first load.

## Tech Stack

- **Backend**: Node.js, Express, MySQL
- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Authentication**: JWT tokens
- **Password Hashing**: bcrypt

## Deployment

| Layer | Platform |
|-------|----------|
| Frontend | [Vercel](https://vercel.com) |
| Backend API | [Render](https://render.com) |
| Database | MySQL on [Railway](https://railway.app) |

The backend is deployed as a Render web service reading its DB credentials from Railway's MySQL connection string via environment variables. The frontend is deployed on Vercel as static files, calling the Render API over HTTPS.

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

⚠️ **Demo/testing accounts only** — these exist on the live deployed database too. Don't rely on them for anything real, and don't add sensitive personal data to these accounts.

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

## Known Limitations

This is a student project, not a production fintech product. A few honest caveats:

- Accounts, income, and expenses are entered **manually** — there's no real bank account linking or transaction sync.
- Free-tier hosting (Render) may spin down when idle, so the first request after inactivity can take ~30-50 seconds.
- No automated test suite yet.
- Historical monthly income data isn't tracked — only the current monthly income figure is available, so cash flow trends over time are approximate for income (expenses are tracked with full date history).
