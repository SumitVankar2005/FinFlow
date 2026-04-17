CREATE DATABASE IF NOT EXISTS finance_db;
USE finance_db;

DROP TABLE IF EXISTS Flag_Assignments;
DROP TABLE IF EXISTS Subscription_Flags;
DROP TABLE IF EXISTS Subscriptions;
DROP TABLE IF EXISTS Loans_Purchases;
DROP TABLE IF EXISTS Investments;
DROP TABLE IF EXISTS Budgets;
DROP TABLE IF EXISTS Expenses;
DROP TABLE IF EXISTS Income;
DROP TABLE IF EXISTS Accounts;
DROP TABLE IF EXISTS Users;

CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(15) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    reg_date DATE NOT NULL,
    address VARCHAR(255)
);

CREATE TABLE Accounts (
    account_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    account_type VARCHAR(50) NOT NULL,
    balance DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    bank_name VARCHAR(100) NOT NULL,
    account_number VARCHAR(30) NOT NULL UNIQUE,
    CONSTRAINT fk_accounts_user
        FOREIGN KEY (user_id) REFERENCES Users(user_id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Income (
    income_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    account_id INT NOT NULL,
    source_name VARCHAR(100) NOT NULL,
    amount DECIMAL(12,2) NOT NULL,
    frequency VARCHAR(30) NOT NULL,
    start_date DATE NOT NULL,
    CONSTRAINT fk_income_user
        FOREIGN KEY (user_id) REFERENCES Users(user_id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_income_account
        FOREIGN KEY (account_id) REFERENCES Accounts(account_id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Expenses (
    expense_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    account_id INT NOT NULL,
    category VARCHAR(50) NOT NULL,
    amount DECIMAL(12,2) NOT NULL,
    expense_date DATE NOT NULL,
    description VARCHAR(255),
    CONSTRAINT fk_expenses_user
        FOREIGN KEY (user_id) REFERENCES Users(user_id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_expenses_account
        FOREIGN KEY (account_id) REFERENCES Accounts(account_id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Budgets (
    budget_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    category VARCHAR(50) NOT NULL,
    allocated_amount DECIMAL(12,2) NOT NULL,
    period_start DATE NOT NULL,
    annual_spent DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    CONSTRAINT fk_budgets_user
        FOREIGN KEY (user_id) REFERENCES Users(user_id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Subscriptions (
    subscription_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    account_id INT NOT NULL,
    service_provider VARCHAR(100) NOT NULL,
    plan_name VARCHAR(100) NOT NULL,
    monthly_cost DECIMAL(10,2) NOT NULL,
    renewal_date DATE NOT NULL,
    status VARCHAR(30) NOT NULL,
    CONSTRAINT fk_subscriptions_user
        FOREIGN KEY (user_id) REFERENCES Users(user_id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_subscriptions_account
        FOREIGN KEY (account_id) REFERENCES Accounts(account_id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Subscription_Flags (
    flag_id INT AUTO_INCREMENT PRIMARY KEY,
    flag_type VARCHAR(100) NOT NULL,
    priority INT NOT NULL DEFAULT 3,
    resolved BOOLEAN NOT NULL DEFAULT FALSE,
    CONSTRAINT chk_priority_range CHECK (priority BETWEEN 1 AND 4)
);

CREATE TABLE Investments (
    investment_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    account_id INT NOT NULL,
    investment_type VARCHAR(50) NOT NULL,
    principal_amount DECIMAL(12,2) NOT NULL,
    current_value DECIMAL(12,2) NOT NULL,
    purchase_date DATE NOT NULL,
    symbol_name VARCHAR(50),
    status VARCHAR(30) NOT NULL,
    notes VARCHAR(255),
    CONSTRAINT fk_investments_user
        FOREIGN KEY (user_id) REFERENCES Users(user_id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_investments_account
        FOREIGN KEY (account_id) REFERENCES Accounts(account_id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Loans_Purchases (
    loan_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    account_id INT NOT NULL,
    type VARCHAR(50) NOT NULL,
    item VARCHAR(100) NOT NULL,
    principal_amount DECIMAL(12,2) NOT NULL,
    outstanding_balance DECIMAL(12,2) NOT NULL,
    monthly_emi DECIMAL(12,2) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    interest_rate DECIMAL(5,2) NOT NULL,
    next_due_date DATE,
    status VARCHAR(30) NOT NULL,
    CONSTRAINT fk_loans_user
        FOREIGN KEY (user_id) REFERENCES Users(user_id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_loans_account
        FOREIGN KEY (account_id) REFERENCES Accounts(account_id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Flag_Assignments (
    assignment_id INT AUTO_INCREMENT PRIMARY KEY,
    subscription_id INT NOT NULL,
    flag_id INT NOT NULL,
    assigned_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    resolved_date TIMESTAMP NULL DEFAULT NULL,
    CONSTRAINT fk_flag_assignments_subscription
        FOREIGN KEY (subscription_id) REFERENCES Subscriptions(subscription_id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_flag_assignments_flag
        FOREIGN KEY (flag_id) REFERENCES Subscription_Flags(flag_id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT uq_subscription_flag UNIQUE (subscription_id, flag_id)
);
