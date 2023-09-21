const { By } = require('selenium-webdriver')
const Page = require('./Page')

class CheckOutPage extends Page {
	// initialization
	constructor(driver) {
		super(driver)
	}

    firstNameEl = By.id('first-name')
    lastNameEl = By.id('last-name')
    postalCodeEl = By.id('postal-code')
    continueEl = By.className('btn_primary cart_button')
    errorEl = By.css('h3[data-test="error"]')

	async openPage() {
		await this.openUrl('/checkout-step-one.html')
	}

    /**
     * 
     * @param {string} firstName
     * @param {string} lastName 
     * @param {string} postalCode
     */
    async inputBuyerInformation(firstName, lastName, postalCode){
        await this.driver.findElement(this.firstNameEl).sendKeys(firstName)
        await this.driver.findElement(this.lastNameEl).sendKeys(lastName)
        await this.driver.findElement(this.postalCodeEl).sendKeys(postalCode)
        await this.driver.findElement(this.continueEl).click()
    }

    async getErrorMessage () {
		return await this.driver.findElement(this.errorEl).getText()
	}
}

module.exports = CheckOutPage