const { By } = require('selenium-webdriver')
const Page = require('./Page')

class LoginPage extends Page {
	// initialization
	constructor (driver) {
		super(driver)
	}

	// element locators
	usernameEl = By.css('#user-name')
	passwordEl = By.css('#password')
	submitEl = By.css('#login-button')
	errorEl = By.css('h3[data-test="error"]')

	// page action
	async openPage () {
		await this.openUrl('/')
	}
	/**
	 * fungsi ini digunakan untuk melakukan login
	 * @param {string} username
	 * @param {string} password
	 */
	async loginProcess (username, password) {
		await this.driver.findElement(this.usernameEl).sendKeys(username)
		await this.driver.findElement(this.passwordEl).sendKeys(password)
		await this.driver.findElement(this.submitEl).click()
	}
	async getErrorMessage () {
		return await this.driver.findElement(this.errorEl).getText()
	}
}

module.exports = LoginPage

