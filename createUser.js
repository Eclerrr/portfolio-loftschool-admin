'use strict'

let mongoose = require('./mongoose');
let readline = require('readline');

let rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

let login = '';
let password = '';


rl.question('Логин: ', answer => {
	login = answer;

	rl.question('Пароль: ', answer =>{
		password = answer;
		rl.close();
	});
});

rl.on('close', () => {
	require('./modules/models/user');

	let User = mongoose.model('user'),
		adminUser = new User({ login : login, password: password});

	User.findOne({ login: login }).then(u => {
		if(u){
			throw new Error('Такой пользователь уже существует')
		}

		return adminUser.save();
	}).then(
		u => console.log('ок!'),
		e => console.error(e.message)
	).then(() => process.exit(0))
});