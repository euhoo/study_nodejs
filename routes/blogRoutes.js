const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const redis = require('redis');
const Blog = mongoose.model('Blog');

const redisUrl = 'redis://127.0.0.1:6379';

module.exports = app => {
	app.get('/api/blogs/:id', requireLogin, async (req, res) => {
		const blog = await Blog.findOne({
			_user: req.user.id,
			_id: req.params.id
		});

		res.send(blog);
	});

	app.get('/api/blogs', requireLogin, async (req, res) => {
		const client = redis.createClient(redisUrl);
		const util = require('util');
		client.get = util.promisify(client.get);
		const id = req.user.id;

		const cachedBlogs = await client.get(id);

		if (cachedBlogs) {
			console.log('SERVING FROM CACHE');
			return res.send(JSON.parse(cachedBlogs));
		}

		const blogs = await Blog.find({_user: id});
		client.set(id, JSON.stringify(blogs))
		console.log('SERVING FROM MONGO_DB');
		res.send(cachedBlogs);
	});

	app.post('/api/blogs', requireLogin, async (req, res) => {
		const {title, content} = req.body;

		const blog = new Blog({
			title,
			content,
			_user: req.user.id
		});

		try {
			await blog.save();
			res.send(blog);
		} catch (err) {
			res.send(400, err);
		}
	});
};
