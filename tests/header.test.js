const Page = require('./helpers/page')

let page;

beforeEach(async () => {
	page = await Page.build();
	await page.gotoBase();
})

afterEach(async () => await page.close());

test('Logo text is correct', async () => {
	const text = await page.getContentsOf('a.brand-logo');
	expect(text).toEqual("Blogster")
})

test('clicking login starts oauth flow', async () => {
	await page.click('.right a');
	const url = await page.url();
	expect(url).toMatch(/accounts\.google\.com/)
})

test('When signed in showe logout button', async () => {
	await page.login()
	const text = await page.getContentsOf('a[href="/auth/logout"]')
	expect(text).toEqual('Logout')
})
