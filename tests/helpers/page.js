const puppeteer = require('puppeteer')
const sessionFactory = require('../factories/sessionFactory');
const userFactory = require('../factories/userFactory');

class CustomPage {
	static async build() {
		const browser = await puppeteer.launch(({headless: false}))
		const page = await browser.newPage()
		const customPage = new CustomPage(page)
		return new Proxy(customPage, {
			get: (target, prop) => customPage[prop] || browser[prop] || page[prop]
		})
	}

	constructor(page) {
		this.page = page;
	}

	async login() {
		const user = await userFactory()
		const {session, sig} = sessionFactory(user)

		await this.setCookie({name: 'session', value: session})
		await this.setCookie({name: 'session.sig', value: sig});
		await this.gotoBlogs()
		await this.waitFor('a[href="/auth/logout"]')
	}

	async getContentsOf(selector) {
		return this.$eval(selector, el => el.innerHTML)
	}

	async gotoBase() {
		return this.goto('localhost:3000')
	}

	async gotoHome() {
		return this.goto('localhost:3000/home')

	}

	async gotoBlogs() {
		return this.goto('localhost:3000/blogs')

	}

	get(path) {
		return this.page.evaluate(url =>
				fetch(url, {
					method: 'GET',
					credentials: 'same-origin',
					headers: {
						'Content-type': 'application/json'
					}
				})
					.then(res => res.json()),
			path)
	}

	post(path, data) {
		return this.page.evaluate((url, _data) =>
				fetch(url, {
					method: 'POST',
					credentials: 'same-origin',
					headers: {
						'Content-type': 'application/json'
					},
					body: JSON.stringify(_data)
				})
					.then(res => res.json()),
			path, data)
	}

	execRequests(actions) {
		return Promise.all(actions.map(({method, path, data}) => this[method](path, data)));
	}
}

module.exports = CustomPage
