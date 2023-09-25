const { WebDriver } = require('selenium-webdriver')

class PageComparison {
	constructor (driver) {
		/** @type {WebDriver} */
		this.driver = driver
	}

	async openUrl (path) {
		this.driver.get(path)
	}
}

module.exports = PageComparison