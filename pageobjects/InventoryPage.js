const { By } = require('selenium-webdriver')
const Page = require('./Page')

class InventoryPage extends Page {
	// initialization
	constructor(driver) {
		super(driver)
	}

	pageTitleEl = By.css('.product_label')
	// addtoCart3El = By.css('.inventory_list .inventory_item:nth-child(3) .btn_inventory')
	addtoCartEl = By.className('btn_primary btn_inventory')
	cartEl = By.className('shopping_cart_link fa-layers fa-fw')

	async openPage() {
		await this.openUrl('/inventory.html')
	}
	async getPageTitle () {
		return await this.driver.findElement(this.pageTitleEl).getText()
	}

	async addToCart () {
		await this.driver.findElement(this.addtoCartEl).click()
		await this.driver.findElement(this.cartEl).click()
	}

}

module.exports = InventoryPage