const { By } = require('selenium-webdriver')
const Page = require('./Page')

class CheckOutOverviewPage extends Page {
	// initialization
	constructor(driver) {
		super(driver)
	}

    productNameEl = By.id('item_4_title_link')
    productPriceEl = By.className('inventory_item_price')
    subTotalEl = By.className('summary_subtotal_label')
    totalEl = By.className('summary_total_label')
    finishEl = By.className('btn_action cart_button')
	finishMessageEl = By.className('complete-text')

	async openPage() {
		await this.openUrl('/checkout-step-two.html')
	}

    async finishCheckOut() {
        await this.driver.findElement(this.finishEl).click()
    }

    async getProductPrice () {
		return await this.driver.findElement(this.productPriceEl).getText()
	}

    async getSubTotal () {
		return await this.driver.findElement(this.subTotalEl).getText()
	}

    async getTotal () {
		return await this.driver.findElement(this.totalEl).getText()
	}

    async getProductName () {
		return await this.driver.findElement(this.productNameEl).getText()
	}

	async getMessage () {
		return await this.driver.findElement(this.finishMessageEl).getText()
	}

}

module.exports = CheckOutOverviewPage