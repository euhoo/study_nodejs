const puppeteer = require('puppeteer')
const sessionFactory = require('./factories/sessionFactory');
const userFactory = require('./factories/userFactory');
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

test('When signed in showe logout button', async () => {
	// const userID = '5fdf6d837fb1f429359d266d';
	const user = await userFactory()
	const {session, sig} = sessionFactory(user)

	await page.setCookie({name: 'session', value: session})
	await page.setCookie({name: 'session.sig', value: sig});
	await page.reload()
	const selector = 'a[href="/auth/logout"]'
	await page.waitFor(selector)
	const text = await page.$eval(selector, el => el.innerHTML)
	expect(text).toEqual('Logout')
})
