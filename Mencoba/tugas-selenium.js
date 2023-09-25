const { Builder, Browser, By, until } = require('selenium-webdriver')

async function checkout () {
	const driver = await new Builder()
		.forBrowser(Browser.CHROME)
		.build()

	await driver.get('https://www.saucedemo.com/v1/')
	await driver.findElement(By.id('user-name')).sendKeys('standard_user')
	await driver.findElement(By.id('password')).sendKeys('secret_sauce')
	await driver.findElement(By.id('login-button')).click()

	await driver.findElement(By.id('item_4_title_link')).click()

	await driver.findElement(By.className('btn_primary btn_inventory')).click()
	await driver.findElement(By.className('shopping_cart_link fa-layers fa-fw')).click()

	await driver.findElement(By.className('btn_action checkout_button')).click()

	await driver.findElement(By.id('first-name')).sendKeys('Faris')
	await driver.findElement(By.id('last-name')).sendKeys('Ikbal')
	await driver.findElement(By.id('postal-code')).sendKeys('60289')
	await driver.findElement(By.className('btn_primary cart_button')).click()

	await driver.findElement(By.className('btn_action cart_button')).click()

	await new Promise(done => setTimeout(done, 2000))

	await driver.findElement(By.css('.bm-burger-button')).click()
	const logout = await driver.findElement(By.id('logout_sidebar_link'))
	await driver.wait(until.elementIsVisible(logout), 2000)
	await logout.click()

	await new Promise(done => setTimeout(done, 2000))
	await driver.close()
}
checkout()