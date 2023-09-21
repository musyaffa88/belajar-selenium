const { By } = require('selenium-webdriver')
const Page = require('./Page')

class CartPage extends Page {
	// initialization
	constructor(driver) {
		super(driver)
	}

	productNameEl = By.className('inventory_item_name')
    checkoutEl = By.className('btn_action checkout_button')

	async openPage() {
		await this.openUrl('/cart.html')
	}
	async getProductName () {
		return await this.driver.findElement(this.productNameEl).getText()
	}

    async checkout(){
        await this.driver.findElement(this.checkoutEl).click()
    }

    async getProductName () {
		return await this.driver.findElement(this.productNameEl).getText()
	}
}

module.exports = CartPage