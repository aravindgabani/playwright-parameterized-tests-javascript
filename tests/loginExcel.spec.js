/**
 * loginExcel.spec.js
 * Parameterized test for Playwright using Excel data
 * Downloaded from: https://software-testing-tutorials-automation.com/2025/09/playwright-parameterized-tests-javascript.html
 */
const path = require('path');
const fs = require('fs');
const fsPromises = fs.promises;
const { pathToFileURL } = require('url');
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { readLoginData, writeTestResult, saveWorkbook } = require('../utilities/excelUtils');

const originalExcelFile = path.resolve(__dirname, '../utilities/testData.xlsx');
const tempExcelFile = path.resolve(__dirname, '../utilities/testData_temp.xlsx');
const sheetName = 'LoginData';

test('Data-driven login tests from Excel (temp file only)', async ({ page }) => {
  // 1️⃣ Create a temporary copy of the Excel file
  await fsPromises.copyFile(originalExcelFile, tempExcelFile);

  // 2️⃣ Read login data from temp file
  const { workbook, worksheet, loginData } = await readLoginData(tempExcelFile, sheetName);
  const loginPage = new LoginPage(page);

  // 3️⃣ Open local login.html
  const loginHtmlPath = path.resolve(__dirname, '../utilities/login.html');
  const loginHtmlUrl = pathToFileURL(loginHtmlPath).href;
  await page.goto(loginHtmlUrl);

  // 4️⃣ Loop through Excel data
  for (const { dataType, uid, password, rowNumber } of loginData) {
    await loginPage.login(uid, password);

    try {
      if (dataType === "Valid") {
        await expect(loginPage.dashboard).toBeVisible();
        await writeTestResult(worksheet, rowNumber, "PASS");
      } else if (dataType === "Invalid") {
        await expect(loginPage.errorMessage).toBeVisible();
        await writeTestResult(worksheet, rowNumber, "PASS");
      }
    } catch (error) {
      await writeTestResult(worksheet, rowNumber, "FAIL");
    }
  }

  // 5️⃣ Save results only to temp file
  await saveWorkbook(workbook, tempExcelFile);

  // ✅ Original Excel file remains untouched
  console.log(`Test results saved in temp file: ${tempExcelFile}`);
});
