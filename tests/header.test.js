const puppeteer = require('puppeteer')

let browser, page;

beforeEach(async () => {
	browser = await puppeteer.launch({
		headless: false,
	})
	page = await browser.newPage();
	await page.goto('localhost:3000');
})

afterEach(async () => await browser.close());

test('Logo text is correct', async () => {
	const text = await page.$eval('a.brand-logo', el => el.innerHTML);
	expect(text).toEqual("Blogster")
})
test('clicking login starts oauth flow', async () => {
	await page.click('.right a');
	const url = await page.url();
	expect(url).toMatch(/accounts\.google\.com/)
})

test.only('When signed in showe logout button', async () => {
	const userID = '5fdf6d837fb1f429359d266d';
	const Buffer = require('safe-buffer').Buffer
	const sessionObject = {
		passport: {
			user: userID
		}
	};
	const sessionString = Buffer
		.from(JSON.stringify(sessionObject))
		.toString('base64');
	const Keygrip = require('keygrip');
	const keys = require('../config/keys')
	const keygrip = new Keygrip([keys.cookieKey])
	const sig = keygrip.sign('session=' + sessionString)

	await page.setCookie({name: 'session', value: sessionString})
	await page.setCookie({name: 'session.sig', value: sig});
	await page.reload()
	const selector = 'a[href="/auth/logout"]'
	await page.waitFor(selector)
	const text = await page.$eval(selector, el => el.innerHTML)
	expect(text).toEqual('Logout')
})
