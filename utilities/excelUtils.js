/**
 * excelUtils.js
 * Utilities to read/write Excel data for Playwright parameterized tests
 * Downloaded from: https://software-testing-tutorials-automation.com/2025/09/playwright-parameterized-tests-javascript.html
 */
const ExcelJS = require('exceljs');

async function readLoginData(filePath, sheetName) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);
  const worksheet = workbook.getWorksheet(sheetName);

  const loginData = [];

  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) return; // skip header row

    const dataType = String(row.getCell(1).value || "").trim();  // Column A → DataType
    const uid = String(row.getCell(2).value || "").trim();       // Column B → UID
    const password = String(row.getCell(3).value || "").trim();  // Column C → Password

    loginData.push({ dataType, uid, password, rowNumber });
  });

  return { workbook, worksheet, loginData };
}

async function writeTestResult(worksheet, rowNumber, result) {
  const resultColumn = 4; // Column D → Pass/Fail
  const row = worksheet.getRow(rowNumber);

  // Write PASS/FAIL
  row.getCell(resultColumn).value = result;

  row.commit();
}

async function saveWorkbook(workbook, filePath) {
  await workbook.xlsx.writeFile(filePath);
}

module.exports = { readLoginData, writeTestResult, saveWorkbook };
