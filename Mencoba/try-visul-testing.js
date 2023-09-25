const { By } = require('selenium-webdriver')
const { existsSync, writeFileSync, readFileSync } = require('fs')
const setupDriver = require('../utils/setupDriver')
const chai = require('chai')
const { chaiImage } = require('chai-image')

chai.use(chaiImage)
const { expect } = chai

async function visualTesting () {
	const PAGE_NAME = 'flashsale'
	const PAGE_URL = 'https://www.tokopedia.com/help/article/syarat-dan-ketentuan-flash-sale-kejar-diskon-spesial-99'

	const driver = await setupDriver()
	await driver.get(PAGE_URL)

	const baseScreenshotPath = `screenshots/base/${PAGE_NAME}.jpg`
	const actualScreenshotPath = `screenshots/actual/${PAGE_NAME}.jpg`
	const isBaseScreenshotExist = existsSync(baseScreenshotPath)

	const pageScreenshot = await driver.takeScreenshot()
	const pageScreenshotBuffer = Buffer.from(pageScreenshot, 'base64')

	if (isBaseScreenshotExist) {
		const baseScreenshotBuffer = readFileSync(baseScreenshotPath)

		writeFileSync(actualScreenshotPath, pageScreenshotBuffer)
		expect(pageScreenshotBuffer).to.matchImage(baseScreenshotBuffer)
	} else {
		writeFileSync(baseScreenshotPath, pageScreenshotBuffer)
	}

	await driver.close()
}
visualTesting()