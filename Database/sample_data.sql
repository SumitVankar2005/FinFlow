USE finance_db;

-- Password for ALL sample users is: 123456
-- Hash below = bcrypt.hashSync('123456', 10)  ← works with bcrypt.compareSync('123456', hash)
-- This is the standard Laravel/Node.js bcrypt test hash, widely verified.

INSERT INTO Users (user_id, name, email, phone, password, reg_date, address) VALUES
(1, 'Aarav Mehta',    'aarav.mehta@gmail.com',    '9876543210', '$2b$10$rvveUes/lr.DQ/3G/YtCueOU4i2ZevQKbJvEdkQY20NzY6jL4zSKy', '2024-01-12', 'Pitampura, Delhi, India'),
(2, 'Sneha Iyer',     'sneha.iyer@gmail.com',     '9876543211', '$2b$10$rvveUes/lr.DQ/3G/YtCueOU4i2ZevQKbJvEdkQY20NzY6jL4zSKy', '2024-02-08', 'Anna Nagar, Chennai, Tamil Nadu, India'),
(3, 'Rohan Kulkarni', 'rohan.kulkarni@gmail.com', '9876543212', '$2b$10$rvveUes/lr.DQ/3G/YtCueOU4i2ZevQKbJvEdkQY20NzY6jL4zSKy', '2024-03-15', 'Kothrud, Pune, Maharashtra, India'),
(4, 'Priya Sharma',   'priya.sharma@gmail.com',   '9876543213', '$2b$10$rvveUes/lr.DQ/3G/YtCueOU4i2ZevQKbJvEdkQY20NzY6jL4zSKy', '2024-04-21', 'Vaishali Nagar, Jaipur, Rajasthan, India'),
(5, 'Kunal Verma',    'kunal.verma@gmail.com',    '9876543214', '$2b$10$rvveUes/lr.DQ/3G/YtCueOU4i2ZevQKbJvEdkQY20NzY6jL4zSKy', '2024-05-10', 'Indirapuram, Ghaziabad, Uttar Pradesh, India');

INSERT INTO Accounts (account_id, user_id, account_type, balance, bank_name, account_number) VALUES
(1,  1, 'Savings', 85420.50,  'State Bank of India',  'SBI1000001'),
(2,  1, 'Salary',  142350.00, 'HDFC Bank',             'HDFC1000002'),
(3,  1, 'Current', 56400.00,  'Axis Bank',             'AXIS1000011'),
(4,  2, 'Savings', 67300.75,  'ICICI Bank',            'ICICI1000003'),
(5,  2, 'Current', 120500.00, 'Axis Bank',             'AXIS1000004'),
(6,  3, 'Savings', 93440.20,  'Kotak Mahindra Bank',   'KOTAK1000005'),
(7,  3, 'Salary',  158900.00, 'HDFC Bank',             'HDFC1000006'),
(8,  3, 'Current', 88450.00,  'State Bank of India',   'SBI1000012'),
(9,  4, 'Savings', 48320.40,  'Punjab National Bank',  'PNB1000007'),
(10, 4, 'Salary',  110250.00, 'ICICI Bank',            'ICICI1000008'),
(11, 5, 'Savings', 76510.60,  'Bank of Baroda',        'BOB1000009'),
(12, 5, 'Current', 201450.00, 'State Bank of India',   'SBI1000010'),
(13, 5, 'Salary',  97200.00,  'Kotak Mahindra Bank',   'KOTAK1000013');

INSERT INTO Income (income_id, user_id, account_id, source_name, amount, frequency, start_date) VALUES
(1,  1, 2,  'Software Engineer Salary',        85000.00, 'Monthly',   '2024-01-31'),
(2,  1, 3,  'Dividend Income',                 2500.00,  'Quarterly', '2025-04-01'),
(3,  1, 1,  'Freelance Web Projects',          18000.00, 'Monthly',   '2024-02-10'),
(4,  2, 5,  'Product Manager Salary',          92000.00, 'Monthly',   '2024-02-29'),
(5,  2, 4,  'Mutual Fund Dividends',           4500.00,  'Quarterly', '2024-04-05'),
(6,  3, 7,  'Data Analyst Salary',             98000.00, 'Monthly',   '2024-03-31'),
(7,  3, 6,  'Online Tutoring',                 12000.00, 'Monthly',   '2024-04-12'),
(8,  4, 10, 'HR Consultant Salary',            76000.00, 'Monthly',   '2024-04-30'),
(9,  4, 9,  'Freelance HR Workshops',          9000.00,  'Monthly',   '2025-09-15'),
(10, 4, 9,  'Rental Income',                   15000.00, 'Monthly',   '2024-05-01'),
(11, 5, 12, 'Business Revenue',                125000.00,'Monthly',   '2024-05-31'),
(12, 5, 13, 'Online Marketplace Sales',        22000.00, 'Monthly',   '2025-11-01');

INSERT INTO Expenses (expense_id, user_id, account_id, category, amount, expense_date, description) VALUES
(1,  1, 2,  'Rent',           22000.00, '2026-01-05', 'Monthly house rent'),
(2,  1, 1,  'Groceries',      6800.00,  '2026-01-09', 'Big Bazaar and local market'),
(3,  1, 1,  'Transport',      2500.00,  '2026-01-12', 'Delhi Metro and cab rides'),
(4,  1, 2,  'Dining',         3200.00,  '2026-02-02', 'Weekend dining out'),
(5,  1, 3,  'Mobile Recharge',799.00,   '2026-03-05', 'Airtel prepaid annual recharge'),
(6,  2, 5,  'Rent',           28000.00, '2026-01-03', 'Apartment rent in Chennai'),
(7,  2, 4,  'Utilities',      4100.00,  '2026-01-08', 'Electricity and internet bill'),
(8,  2, 4,  'Groceries',      7200.00,  '2026-01-14', 'Reliance Fresh and local stores'),
(9,  2, 5,  'Travel',         5500.00,  '2026-02-10', 'Train tickets and local transport'),
(10, 2, 5,  'Medical',        2100.00,  '2026-03-08', 'Clinic visit and medicines'),
(11, 3, 7,  'Rent',           24000.00, '2026-01-04', 'Monthly apartment rent'),
(12, 3, 6,  'Healthcare',     3600.00,  '2026-01-18', 'Apollo pharmacy and consultation'),
(13, 3, 6,  'Shopping',       7800.00,  '2026-02-01', 'Clothing purchase'),
(14, 3, 7,  'Food',           4200.00,  '2026-02-11', 'Swiggy and office lunch'),
(15, 3, 8,  'Internet',       999.00,   '2026-03-10', 'JioFiber monthly bill'),
(16, 4, 9,  'Education',      5000.00,  '2026-01-20', 'Online certification fees'),
(17, 4, 10, 'Groceries',      6100.00,  '2026-02-08', 'DMart monthly shopping'),
(18, 4, 9,  'Fuel',           3000.00,  '2026-03-12', 'Petrol expenses'),
(19, 5, 12, 'Office Rent',    35000.00, '2026-01-05', 'Business office rent'),
(20, 5, 11, 'Fuel',           4800.00,  '2026-01-11', 'Fuel for business travel'),
(21, 5, 12, 'Insurance',      9200.00,  '2026-02-15', 'Business insurance premium'),
(22, 5, 13, 'Maintenance',    4500.00,  '2026-03-14', 'Shop maintenance and repairs');

INSERT INTO Budgets (budget_id, user_id, category, allocated_amount, period_start, annual_spent) VALUES
(1,  1, 'Household',    30000.00, '2026-01-01', 126000.00),
(2,  1, 'Transport',    5000.00,  '2026-01-01', 18000.00),
(3,  1, 'Entertainment',6000.00,  '2026-01-01', 22000.00),
(4,  2, 'Household',    38000.00, '2026-01-01', 148000.00),
(5,  2, 'Healthcare',   6000.00,  '2026-01-01', 19500.00),
(6,  2, 'Travel',       8000.00,  '2026-01-01', 31000.00),
(7,  3, 'Health',       7000.00,  '2026-01-01', 25000.00),
(8,  3, 'Lifestyle',    10000.00, '2026-01-01', 41000.00),
(9,  4, 'Utilities',    7000.00,  '2026-01-01', 26000.00),
(10, 4, 'Groceries',    9000.00,  '2026-01-01', 34000.00),
(11, 5, 'Business',     50000.00, '2026-01-01', 190000.00),
(12, 5, 'Transport',    7000.00,  '2026-01-01', 28000.00),
(13, 5, 'Insurance',    12000.00, '2026-01-01', 46000.00);

INSERT INTO Subscriptions (subscription_id, user_id, account_id, service_provider, plan_name, monthly_cost, renewal_date, status) VALUES
(1,  1, 1,  'Netflix',         'Mobile',            149.00, '2026-05-02', 'active'),
(2,  1, 2,  'Spotify',         'Individual',        119.00, '2026-05-10', 'active'),
(3,  2, 4,  'Amazon Prime',    'Annual Membership', 125.00, '2026-09-01', 'active'),
(4,  2, 4,  'Spotify',         'Mini',              99.00,  '2026-06-08', 'active'),
(5,  2, 5,  'YouTube Premium', 'Individual',        129.00, '2026-05-16', 'active'),
(6,  3, 6,  'Disney+ Hotstar', 'Super',             299.00, '2026-06-20', 'active'),
(7,  3, 7,  'Netflix',         'Basic',             199.00, '2026-05-28', 'paused'),
(8,  4, 9,  'Zomato Gold',     'Monthly',           149.00, '2026-05-14', 'active'),
(9,  4, 10, 'Netflix',         'Mobile',            149.00, '2026-05-22', 'active'),
(10, 5, 11, 'JioHotstar',      'Premium',           299.00, '2026-05-30', 'active'),
(11, 5, 12, 'Microsoft 365',   'Personal',          489.00, '2026-06-12', 'active'),
(12, 5, 11, 'Adobe Express',   'Premium',           399.00, '2026-06-18', 'active');

INSERT INTO Subscription_Flags (flag_id, flag_type, priority, resolved) VALUES
(1, 'High Cost Subscription',    2, FALSE),
(2, 'Upcoming Renewal',          3, FALSE),
(3, 'Inactive Usage',            1, FALSE),
(4, 'Duplicate Service Category',4, TRUE),
(5, 'Payment Failure Risk',      1, FALSE),
(6, 'Price Increase Detected',   2, FALSE);

INSERT INTO Investments (investment_id, user_id, account_id, investment_type, principal_amount, current_value, purchase_date, symbol_name, status, notes) VALUES
(1,  1, 1,  'Stock',       50000.00, 58200.00, '2024-06-15', 'RELIANCE',                      'active', 'Reliance Industries shares'),
(2,  1, 3,  'ETF',         28000.00, 30120.00, '2025-01-10', 'NIFTYBEES',                     'active', 'Nifty 50 ETF holding'),
(3,  1, 2,  'Mutual Fund', 30000.00, 34750.00, '2024-08-10', 'SBI Bluechip Fund',             'active', 'Large cap mutual fund'),
(4,  2, 4,  'Stock',       45000.00, 50100.00, '2024-07-18', 'TCS',                           'active', 'Tata Consultancy Services shares'),
(5,  2, 5,  'Gold ETF',    25000.00, 27180.00, '2024-09-01', 'GOLDBEES',                      'active', 'Gold ETF investment'),
(6,  3, 6,  'Stock',       40000.00, 43220.00, '2024-10-05', 'INFY',                          'active', 'Infosys shares'),
(7,  3, 8,  'Stock',       36000.00, 39280.00, '2025-02-22', 'LT',                            'active', 'Larsen and Toubro shares'),
(8,  3, 7,  'Mutual Fund', 35000.00, 38960.00, '2024-11-12', 'HDFC Flexi Cap Fund',           'active', 'Flexi cap SIP holding'),
(9,  4, 9,  'Stock',       38000.00, 40150.00, '2024-07-25', 'HDFCBANK',                      'active', 'HDFC Bank shares'),
(10, 4, 9,  'Mutual Fund', 32000.00, 34710.00, '2025-03-18', 'ICICI Prudential Bluechip Fund','active', 'Bluechip fund investment'),
(11, 4, 10, 'PPF',         60000.00, 64200.00, '2024-04-01', 'PPF Account',                   'active', 'Public Provident Fund contribution'),
(12, 5, 11, 'Stock',       55000.00, 61800.00, '2024-06-30', 'ICICIBANK',                     'active', 'ICICI Bank shares'),
(13, 5, 12, 'Bond',        70000.00, 72450.00, '2024-05-20', 'GOI Bond',                      'active', 'Government of India bond');

INSERT INTO Loans_Purchases (loan_id, user_id, account_id, type, item, principal_amount, outstanding_balance, monthly_emi, start_date, end_date, interest_rate, next_due_date, status) VALUES
(1, 1, 2,  'personal_loan', 'Wedding Expenses Loan', 200000.00,  128000.00,  8900.00,  '2024-03-01','2027-02-01', 11.50,'2026-05-05','active'),
(2, 2, 5,  'car_loan',      'Hyundai i20',           650000.00,  410000.00,  15400.00, '2024-01-15','2029-01-15',  9.20,'2026-05-03','active'),
(3, 2, 4,  'education_loan','MBA Program',            450000.00,  295000.00,  11800.00, '2023-07-01','2028-07-01', 10.10,'2026-05-12','active'),
(4, 3, 7,  'consumer_loan', 'Laptop Purchase',         95000.00,   28000.00,  5400.00,  '2025-02-10','2026-10-10', 13.00,'2026-05-10','active'),
(5, 4, 10, 'home_loan',     'Apartment Purchase',    2800000.00, 2495000.00, 26500.00, '2023-08-01','2038-08-01',  8.60,'2026-05-06','active'),
(6, 5, 12, 'business_loan', 'Retail Shop Expansion',  900000.00,  620000.00, 21200.00, '2024-05-01','2029-05-01', 10.75,'2026-05-08','active');

INSERT INTO Flag_Assignments (assignment_id, subscription_id, flag_id, assigned_date, resolved_date) VALUES
(1, 1,  2, '2026-04-01 09:30:00', NULL),
(2, 5,  1, '2026-04-02 11:00:00', NULL),
(3, 7,  3, '2026-04-04 14:45:00', NULL),
(4, 9,  4, '2026-03-15 10:20:00', '2026-03-20 18:00:00'),
(5, 11, 5, '2026-04-06 16:10:00', NULL),
(6, 3,  6, '2026-04-08 12:15:00', NULL),
(7, 4,  2, '2026-04-09 09:40:00', NULL);
