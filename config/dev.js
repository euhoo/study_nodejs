const credentials = require('../credentials')
const {db} = credentials;
const {userName, password, dbName} = db;
module.exports = {
	googleClientID:
		'70265989829-0t7m7ce5crs6scqd3t0t6g7pv83ncaii.apps.googleusercontent.com',
	googleClientSecret: '8mkniDQOqacXtlRD3gA4n2az',
	mongoURI: `mongodb://${userName}:${password}@cluster0-shard-00-00.lcxzk.mongodb.net:27017,cluster0-shard-00-01.lcxzk.mongodb.net:27017,cluster0-shard-00-02.lcxzk.mongodb.net:27017/${dbName}?ssl=true&replicaSet=atlas-lv3v5w-shard-0&authSource=admin&retryWrites=true&w=majority`,
	cookieKey: '123123123',
	redisUrl: 'redis://127.0.0.1:6379',
};
