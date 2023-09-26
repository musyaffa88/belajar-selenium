const { WebDriver } = require('selenium-webdriver')

class VisualPage {
	constructor (driver) {
		/** @type {WebDriver} */
		this.driver = driver
	}

	async openUrl (path) {
		this.driver.get(path)
	}
}

module.exports = VisualPage