const Page = require('./helpers/page')

let page;

beforeEach(async () => {
	page = await Page.build();
	await page.gotoBase();
})

afterEach(async () => await page.close());


test('When logged in can see blog create form', async () => {
	await page.login();
	await page.click('a[href="/blogs/new"]');
	const label = await page.getContentsOf('form label');
	expect(label).toEqual('Blog Title')
})
