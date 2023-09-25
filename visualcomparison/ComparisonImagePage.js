const { By } = require('selenium-webdriver')
const { existsSync, writeFileSync, readFileSync } = require('fs')
const setupDriver = require('../utils/setupDriver')
const chai = require('chai')
const { chaiImage } = require('chai-image')

chai.use(chaiImage)
const { expect } = chai
const VisualPage = require('./VisualPage')

class ComparisonPage extends VisualPage {
	constructor (driver) {
		super(driver)
	}

	/**
	 * 
	 * @param {string} PAGE_URL
	 */
	async openPage (PAGE_URL) {
		await this.openUrl(PAGE_URL)
	}
	/**
	 * 
	 * @param {string} PAGE_NAME
	 */
	async ComparisonProcess (PAGE_NAME) {
		const baseScreenshotPath = `screenshots/base/${PAGE_NAME}.jpg`
		const actualScreenshotPath = `screenshots/actual/${PAGE_NAME}.jpg`
		const isBaseScreenshotExist = existsSync(baseScreenshotPath)

		const pageScreenshot = await this.driver.takeScreenshot()
		const pageScreenshotBuffer = Buffer.from(pageScreenshot, 'base64')
		if (isBaseScreenshotExist) {
			const baseScreenshotBuffer = readFileSync(baseScreenshotPath)
			writeFileSync(actualScreenshotPath, pageScreenshotBuffer)
			expect(pageScreenshotBuffer).to.matchImage(baseScreenshotBuffer)
		} else {
			writeFileSync(baseScreenshotPath, pageScreenshotBuffer)
			console.log('Gambar Base Baru Ditambahkan');
		}
	}

}

module.exports = ComparisonPage

