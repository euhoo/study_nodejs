import chalk from "chalk";
import express from "express";
import cluster from 'cluster';
import crypto from 'crypto';

//ab -c 50 -n 500 localhost:3000/fast
console.log('Is master cluster: ', cluster.isMaster);
const app = express();

if (cluster.isMaster) {
	cluster.fork()
} else {
	app.get('/', (req, res) => {
		crypto.pbkdf2('a', 'b', 100000, 1024, 'sha512', () => {
			res.send('Hi there');
		})
	})
	app.get('/fast', (req, res) => {
		res.send('Hi there');
	})
	const port = 3000
	app.listen(port);
	console.log(`Server listening at port:${chalk.green(port)}`);
}
