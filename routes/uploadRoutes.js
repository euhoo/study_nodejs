const AWS = require('aws-sdk');
const uuid = require("uuid/v1");
const keys = require('../config/keys');
const requireLogin = require('../middlewares/requireLogin');

const {accessKeyId, secretAccessKey, bucket} = keys;
const s3 = new AWS.S3({accessKeyId, secretAccessKey, signatureVersion: 'v4', region: 'eu-central-1'})

module.exports = app => {
	app.get('/api/upload', requireLogin, (req, res) => {
		const key = `${req.user.id}/${uuid()}.jpeg`;
		const params = {
			Bucket: bucket,
			Key: key,
			ContentType: 'image/jpeg'
		}

		s3.getSignedUrl('putObject', params, (err, url) => res.send({key, url}))
	})


}
