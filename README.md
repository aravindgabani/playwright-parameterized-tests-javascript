# Playwright Parameterized Tests with JavaScript

This project demonstrates **Playwright data-driven testing** using **Excel as a test data source**.  
It follows the **Page Object Model (POM)** design pattern and shows how to **parameterize Playwright tests** dynamically.

---

## 📌 Getting Started With Playwright Parameterized Tests

We are going to use:

- **Playwright with JavaScript** (test framework)
- **VS Code** (code editor)
- **POM** (separate file to store page locators)
- **ExcelJS** (`excelUtils.js` to read/write test data from Excel file)

---

## 📂 Project Structure
project-root/
├─ pages/
│ └─ LoginPage.js # Page Object Model for login page
├─ tests/
│ └─ loginExcel.spec.js # Test file with parameterized logic
├─ utilities/
│ ├─ excelUtils.js # Functions to read/write Excel test data
│ ├─ testData.xlsx # Excel file storing test data sets
│ └─ login.html # Sample offline login page for testing


---

## 📥 Download Project Files

You can download individual project files here:

- [LoginPage.js](./pages/LoginPage.js)  
- [loginExcel.spec.js](./tests/loginExcel.spec.js)  
- [excelUtils.js](./utilities/excelUtils.js)  
- [testData.xlsx](./utilities/testData.xlsx)  
- [login.html](./utilities/login.html)  

👉 Or, download the **full project** from this repository and start testing directly.

---

## 🛠 Installation

1. Install dependencies:
   ```bash
   node -v
   npm install @playwright/test
   npm install exceljs
2. Run Playwright tests:
   npx playwright test

# Features Covered
- Dynamic tests in Playwright using Excel test data.
- Parameterized login tests with multiple datasets.
- Write test results (PASS/FAIL) into a temporary Excel file with row coloring.
- Best practices with Page Object Model (POM).









