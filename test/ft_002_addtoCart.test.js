const { By, WebDriver } = require('selenium-webdriver')
const { expect } = require('chai')
const setupDriver = require('../utils/setupDriver')
const InventoryPage = require('../pageobjects/InventoryPage')
const CartPage = require('../pageobjects/CartPage')

describe('Add Product to Cart', function () {
	/** @type {WebDriver} */ let driver
	/** @type {InventoryPage} */ let inventoryPage
    /** @type {cartPage} */ let cartPage

	before(async function () {
		driver = await setupDriver()
		inventoryPage = new InventoryPage(driver)
        cartPage = new CartPage(driver)
	})

    it('Mencoba menambahkan produk ke keranjang', async function () {
        await inventoryPage.openPage()
        await inventoryPage.addToCart()
        const message = await cartPage.getProductName()
        expect(message).to.include('Sauce Labs Backpack')
    })
        
	afterEach(async function () {
		await driver.sleep(2000)
	})

	after(async function () {
		await driver.close()
	})
})


