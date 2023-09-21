const { WebDriver } = require('selenium-webdriver')

class Page {
	constructor (driver) {
		/** @type {WebDriver} */
		this.driver = driver
	}

	async openUrl (path = '/') {
		this.driver.get('https://www.saucedemo.com/v1' + path)
	}
}

module.exports = Page