const Discord = require('discord.js');
const debug = require('debug')('app:main');
const express = require('express');
const path = require('path');
const { host, port } = require('config');

const msglib = require('./msglib');

const client = new Discord.Client();

client.on('ready', () => {
	debug('Discord bot is online');
});

client.on('message', msglib.onMessage);

client.login(config.token);

const app = express();

app.get('/authorize', (req, res) => {
	console.log(req.originalUrl);
	
	res.sendFile(path.resolve('index.html'));
});

app.listen(port, () => {
	debug(`App is now listening on ${host}`);
});