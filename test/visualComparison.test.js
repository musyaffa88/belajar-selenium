const { By, WebDriver } = require('selenium-webdriver')
const { expect } = require('chai')
const setupDriver = require('../utils/setupDriver')
const ComparisonImagePage = require('../visualcomparison/ComparisonImagePage')

describe('Visual Test', function () {
	/** @type {WebDriver} */ let driver
	/** @type {ComparisonImagePage} */ let comparisonImagePage

	before(async function () {
		driver = await setupDriver()
		comparisonImagePage = new ComparisonImagePage(driver)
	})

    it('Visual Testing halaman www.chaijs.com ', async function () {
        await comparisonImagePage.openPage('https://www.chaijs.com/')
        await new Promise(done => setTimeout(done, 500))
        await comparisonImagePage.ComparisonProcess('Chai')
    })

    it('Visual Testing halaman www.chaijs.com/guide/ ', async function () {
        await comparisonImagePage.openPage('https://www.chaijs.com/guide/')
        await new Promise(done => setTimeout(done, 500))
        await comparisonImagePage.ComparisonProcess('Guide')
    })

    it('Visual Testing halaman www.chaijs.com/api/ ', async function () {
        await comparisonImagePage.openPage('https://www.chaijs.com/api/')
        await new Promise(done => setTimeout(done, 500))
        await comparisonImagePage.ComparisonProcess('API')
    })

    it('Visual Testing halaman www.chaijs.com/plugins/ ', async function () {
        await comparisonImagePage.openPage('https://www.chaijs.com/plugins/')
        await new Promise(done => setTimeout(done, 500))
        await comparisonImagePage.ComparisonProcess('Plugins')
    })

    it('Visual Testing halaman www.selenium.dev ', async function () {
        await comparisonImagePage.openPage('https://www.selenium.dev/')
        await new Promise(done => setTimeout(done, 500))
        await comparisonImagePage.ComparisonProcess('Selenium')
    })

	afterEach(async function () {
		await driver.sleep(2000)
	})

	after(async function () {
		await driver.close()
	})
})


