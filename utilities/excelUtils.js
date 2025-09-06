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
  const resultColumn = 4; // Column D → Result
  const row = worksheet.getRow(rowNumber);

  // Write result
  row.getCell(resultColumn).value = result;

  // Determine color for this row
  let color;
  if (result.toUpperCase() === 'PASS') {
    color = 'FF00FF00'; // Green
  } else if (result.toUpperCase() === 'FAIL') {
    color = 'FFFF0000'; // Red
  } else {
    color = 'FFFFFFFF'; // Default white
  }

  // Apply color only to this row's cells
  row.eachCell({ includeEmpty: true }, (cell) => {
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: color },
    };
  });

  row.commit();
}

async function saveWorkbook(workbook, filePath) {
  await workbook.xlsx.writeFile(filePath);
}

module.exports = { readLoginData, writeTestResult, saveWorkbook };
