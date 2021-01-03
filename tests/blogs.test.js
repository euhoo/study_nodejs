const Page = require('./helpers/page')

let page;

beforeEach(async () => {
	page = await Page.build();
	await page.gotoBase();
})
afterEach(async () => await page.close());

describe('When logged in', async () => {
	beforeEach(async () => {
		await page.login();
		await page.click('a.btn-floating');
	})
	test('can see blog create form', async () => {
		const label = await page.getContentsOf('form label');
		expect(label).toEqual('Blog Title')
	})
	describe('And using valid inputs', async () => {
		beforeEach(async () => {
			await page.type('.title input', 'MT')
			await page.type('.content input', 'MC')
			await page.click('form button')
		})
		test('Submitting takes user to review screen', async () => {
			const text = await page.getContentsOf('h5');
			expect(text).toEqual('Please confirm your entries');
		})
		test('Submitting then saving adds blog to index page', async () => {
			await page.click('button.green');
			await page.waitFor('.card');

			const title = await page.getContentsOf('.card-title');
			const content = await page.getContentsOf('p');
			expect(title).toEqual('MT')
			expect(content).toEqual('MC')
		})
	})
})
describe('User is not logged in', async () => {
	const actions = [
		{
			method: 'get',
			path: '/api/blogs'
		},
		{
			method: 'post',
			path: '/api/blogs',
			data: {
				title: 'T',
				content: 'C'
			}
		}
	];
	test('Blog related actions are prohibited', async () => {
		const results = await page.execRequests(actions);
		results.forEach(r => {
			expect(r).toEqual({error: 'You must log in!'})
		})
	})
	test('get', async () => {
		const result = await page.get('/api/blogs');
		expect(result).toEqual({error: 'You must log in!'})
	})
	test('post', async () => {
		const result = await page.post('/api/blogs', {title: 'T', content: 'C'});
		expect(result).toEqual({error: 'You must log in!'})
	})
})
