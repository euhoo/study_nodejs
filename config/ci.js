module.exports = {
	googleClientID:
		'70265989829-0t7m7ce5crs6scqd3t0t6g7pv83ncaii.apps.googleusercontent.com',
	googleClientSecret: '8mkniDQOqacXtlRD3gA4n2az',
	mongoURI: `mongodb://127.0.0.1:27017/blog_ci`, //в доке не указан порт, используется дефолтный 27017. название базы blog_ci можно выбрать тоже любое
	cookieKey: '123123123',
	redisUrl: 'redis://127.0.0.1:6379', //в доке не указан порт, используется дефолтный 6379
};
