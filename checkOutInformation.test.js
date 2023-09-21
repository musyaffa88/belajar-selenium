const { By, WebDriver } = require('selenium-webdriver')
const { expect } = require('chai')
const setupDriver = require('./utils/setupDriver')
const LoginPage = require('./pageobjects/LoginPage')
const InventoryPage = require('./pageobjects/InventoryPage')
const CartPage = require('./pageobjects/CartPage')
const CheckOutPage = require('./pageobjects/CheckOutPage')
const CheckOutOverviewPage = require('./pageobjects/CheckOutOverviewPage')

describe('Check Out Information', function () {
	/** @type {WebDriver} */ let driver
    /** @type {cartPage} */ let cartPage
    /** @type {LoginPage} */ let loginPage
	/** @type {InventoryPage} */ let inventoryPage
    /** @type {checkOutPage} */ let checkOutPage
    /** @type {checkOutOverviewPage} */ let checkOutOverviewPage

	before(async function () {
		driver = await setupDriver()
        loginPage = new LoginPage(driver)
		inventoryPage = new InventoryPage(driver)
        cartPage = new CartPage(driver)
        checkOutPage = new CheckOutPage(driver)
        checkOutOverviewPage = new CheckOutOverviewPage(driver)
	})
    
    // beforeEach(async function(){
    //     await loginPage.openPage()
    //     await loginPage.loginProcess('standard_user', 'secret_sauce')
    //     await inventoryPage.openPage()
    //     await inventoryPage.addToCart()
    // })

    it('Mencoba dengan data yang valid', async function () {
        await loginPage.openPage()
        await loginPage.loginProcess('standard_user', 'secret_sauce')
        await inventoryPage.openPage()
        await inventoryPage.addToCart()
        await cartPage.checkout()
        await checkOutPage.inputBuyerInformation('Faris', 'Ikbal', '61222')

        const productName = await checkOutOverviewPage.getProductName()
        const productPrice = await checkOutOverviewPage.getProductPrice()
        const subTotal = await checkOutOverviewPage.getSubTotal()
        const total = await checkOutOverviewPage.getTotal()
        expect(productName).to.include('Sauce Labs Backpack')
        expect(productPrice).to.include('29.99')
        expect(subTotal).to.include('29.99')
        expect(total).to.include('32.39')
    })

    it('Mencoba dengan tidak mengisi first name', async function () {
        await checkOutPage.openPage()
        await checkOutPage.inputBuyerInformation('', 'Ikbal', '61222')
        
        const errorMessage = await checkOutPage.getErrorMessage()
        expect(errorMessage).to.include('First Name is required')
    })
    it('Mencoba dengan tidak mengisi last name', async function () {
        await checkOutPage.openPage()
        await checkOutPage.inputBuyerInformation('Faris', '', '61222')
        
        const errorMessage = await checkOutPage.getErrorMessage()
        expect(errorMessage).to.include('Last Name is required')
    })
    it('Mencoba dengan tidak mengisi postal code', async function () {
        await checkOutPage.openPage()
        await checkOutPage.inputBuyerInformation('Faris', 'Ikbal', '')
        
        const errorMessage = await checkOutPage.getErrorMessage()
        expect(errorMessage).to.include('Postal Code is required')
    })
        
	afterEach(async function () {
		await driver.sleep(2000)
	})

	after(async function () {
		await driver.close()
	})
})


