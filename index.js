const config = require('config');
const Discord = require('discord.js');
const debug = require('debug')('app:main');
const server = require('./server');

const msglib = require('./msglib');

const client = new Discord.Client();

client.on('ready', () => {
	debug('Discord bot is online');
});

client.on('message', msglib.onMessage);

client.login(config.token);