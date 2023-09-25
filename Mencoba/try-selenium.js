const { Builder, Browser, By, until } = require('selenium-webdriver')

async function run () {
	const driver = await new Builder()
		.forBrowser(Browser.CHROME)
		.build()

	await driver.get('https://www.saucedemo.com/v1/')
	await driver.findElement(By.id('user-name')).sendKeys('standard_user')
	await driver.findElement(By.id('password')).sendKeys('secret_sauce')
	await driver.findElement(By.id('login-button')).click()
	
	await driver
		.findElement(By.css('.product_sort_container option[value="za"]'))
		.click()

	await driver.executeScript(function () {
		window.scrollTo({
			top: 200,
			behavior: 'smooth'
		})
	})

	await new Promise(done => setTimeout(done, 3000))

	await driver.findElement(By.css('.bm-burger-button')).click()
	const logout = await driver.findElement(By.id('logout_sidebar_link'))
	await driver.wait(until.elementIsVisible(logout), 3000)
	await logout.click()

	await new Promise(done => setTimeout(done, 3000))
	await driver.close()
}
run()