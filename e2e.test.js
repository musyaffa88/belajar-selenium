const { By, WebDriver, until } = require('selenium-webdriver')
const { expect } = require('chai')
const setupDriver = require('./utils/setupDriver')
const LoginPage = require('./pageobjects/LoginPage')
const InventoryPage = require('./pageobjects/InventoryPage')
const CartPage = require('./pageobjects/CartPage')
const CheckOutPage = require('./pageobjects/CheckOutPage')
const CheckOutOverviewPage = require('./pageobjects/CheckOutOverviewPage')

describe('End to end test', function () {
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

    it('Mencoba fitur dari awal sampai akhir', async function () {
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

        await checkOutOverviewPage.finishCheckOut()
        const mess = await checkOutOverviewPage.getMessage()
        expect(mess).to.include('Your order has been dispatched, and will arrive just as fast as the pony can get there!')

        await new Promise(done => setTimeout(done, 2000))

        await driver.findElement(By.css('.bm-burger-button')).click()
        const logout = await driver.findElement(By.id('logout_sidebar_link'))
        await driver.wait(until.elementIsVisible(logout), 2000)
        await logout.click()
    })
        
	afterEach(async function () {
		await driver.sleep(2000)
	})

	after(async function () {
		await driver.close()
	})
})


