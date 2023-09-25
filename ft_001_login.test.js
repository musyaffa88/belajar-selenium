const { By, WebDriver } = require('selenium-webdriver')
const { expect } = require('chai')
const setupDriver = require('./utils/setupDriver')
const LoginPage = require('./pageobjects/LoginPage')
const InventoryPage = require('./pageobjects/InventoryPage')

describe('Login', function () {
	/** @type {WebDriver} */ let driver
	/** @type {LoginPage} */ let loginPage
	/** @type {InventoryPage} */ let inventoryPage

	before(async function () {
		driver = await setupDriver()
		loginPage = new LoginPage(driver)
		inventoryPage = new InventoryPage(driver)
	})
    
    it('Mencoba dengan username = standard_user dan password benar - Positive Test', async function () {
        await loginPage.openPage()
        await loginPage.loginProcess('standard_user', 'secret_sauce')

        const productTitle = await inventoryPage.getPageTitle()
        expect(productTitle).to.be.equal('Products')
    })

    it('Mencoba dengan username = problem_user dan password benar - Positive Test', async function () {
        await loginPage.openPage()
        await loginPage.loginProcess('problem_user', 'secret_sauce')
        
        const productTitle = await inventoryPage.getPageTitle()
        expect(productTitle).to.be.equal('Products')
    })
    it('Mencoba dengan username = locked_out_user dan password benar - Negative Test', async function () {
        await loginPage.openPage()
        await loginPage.loginProcess('locked_out_user', 'secret_sauce')

        const errorMessage = await loginPage.getErrorMessage()
        expect(errorMessage).to.include('Sorry, this user has been locked out.')
    })

    it('Mencoba tidak mengisi username - Negative Test', async function () {
        await loginPage.openPage()
        await loginPage.loginProcess('', 'secret_sauce')

        const errorMessage = await loginPage.getErrorMessage()
        expect(errorMessage).to.include('Username is required')
    })

    it('Mencoba tidak mengisi password - Negative Test', async function () {
        await loginPage.openPage()
        await loginPage.loginProcess('standard_user', '')

        const errorMessage = await loginPage.getErrorMessage()
        expect(errorMessage).to.include('Password is required')
    })

    it('Mencoba dengan data yang salah - Negative Test', async function () {
        await loginPage.openPage()
        await loginPage.loginProcess('faris', 'nosecret_sauce')

        const errorMessage = await loginPage.getErrorMessage()
        expect(errorMessage).to.include('Username and password do not match any user')
    })
        
	afterEach(async function () {
		await driver.sleep(2000)
	})

	after(async function () {
		await driver.close()
	})
})


