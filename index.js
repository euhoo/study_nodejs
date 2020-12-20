import chalk from "chalk";
import express from "express";

const doWork = (duration) => {
	 const start = Date.now();
	 while(Date.now() - start < duration) {}
}

const app = express();

app.get('/', (req, res) => {
	console.log(chalk.blue('started'));
	doWork(5000);
	console.log(chalk.blue('finished'));
	res.send('Hi there');
})
const port = 3000
app.listen(port);
console.log(`Server listening at port:${chalk.green(port)}`);
