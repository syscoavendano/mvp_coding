const readline = require('readline');
let interval = '';

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

let data = [
	{ email: 'joglo@aol.com', status: false },
	{ email: 'stecoop@att.net', status: false },
	{ email: 'test@test.com', status: false }
];

function displayData() {
	let transform = '';
	for (var x = 0; x < data.length; x++) {
		if (transform === '') transform = `${data[x].email}: ${data[x].status}, `;
		else
			if (x === (data.length-1))
				transform = `${transform}${data[x].email}: ${data[x].status}`;
			else
				transform = `${transform}${data[x].email}: ${data[x].status}, `;
	}
	console.log('>>', transform);
}

rl.question(`>> Welcome to my optizmo coding test. Please enter in seconds how often you would like to receive output alerts \n`, (input) => {
	const seconds = input * 1000;
 	interval = setInterval(displayData, seconds);
	rl.setPrompt(`>> Please enter an email address to get started \n`);
	rl.prompt();
	rl.on('line', (answer) => {
		switch (answer) {
			case 'quit':
				rl.close();
				break;
			case 'stop':
				console.log('>> stopped');
				clearInterval(interval);
				break;
			case 'start':
				console.log('>> started');
				interval = setInterval(displayData, seconds);
				break;
			default:
				const index = data.findIndex(item => item.email === answer);
				if (index === -1) {
					data.push({ email: answer, status: false });
				} else {
					console.log('>> Found it');
					data[index] = { email: answer, status: true };
				}
				displayData();
				rl.setPrompt(`>> Please enter the next email address \n`);
				rl.prompt();
		}
	})
}, interval);

rl.on('close', () => {
	console.log(`>> Cya!`);
	process.exit();
})


