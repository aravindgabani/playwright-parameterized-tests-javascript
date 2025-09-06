/**
 * LoginPage.js
 * Part of Playwright Parameterized Tests Tutorial
 * Downloaded from: https://software-testing-tutorials-automation.com/2025/09/playwright-parameterized-tests-javascript.html
 */
class LoginPage {
  constructor(page) {
    this.page = page;
    // Playwright locators in Page Object Model
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.dashboard = page.getByText('Welcome to Dashboard');
    this.errorMessage = page.getByText('Invalid credentials');
  }

  // Method to perform login action
  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

}

module.exports = { LoginPage };

