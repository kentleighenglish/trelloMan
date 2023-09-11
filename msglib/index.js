const debug = require('debug')('app:msglib');
const debugErr = require('debug')('app:error');
const { msg: msgConfig, messages, helpMessages } = require('config');
const { get } = require('lodash');

const trelloLib = require('../trellolib');

const regexEscape = string => string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

const hexToDecimal = hex => parseInt(hex.replace(/#/g, ''), 16);

const allCommands = [].concat(msgConfig.commands, msgConfig.boardCommands);

const sendMessage = async (channel) => {
	
}

const onMessage = async (msg) => {
	const { member, content, channel, author } = msg;

	if (content.indexOf(msgConfig.prefix+' ') === 0 && member.hasPermission('ADMINISTRATOR')) {
		debug(`Received command from @${author.username}`);
		
		try {
			const commandData = await processContent(content);
			const channelData = await processChannel(channel);
			
			if (msgConfig.boardCommands.includes(commandData.command) && !channelData.board) {
				throw new Error(messages.noBoard);
			}
			
			const result = await runCommand(commandData, channelData, channel);
			
			if (result) {
				msg.delete();
			}
		} catch(e) {
			debugErr(e);
			await sendFormatted(channel, e.message, 'error');
		}
	}
}

const commandRegex = new RegExp('(?:\")[^\"]*(?:\")|[^\\s]+', 'g');

const processContent = async (content) => {
	const prefix = regexEscape(msgConfig.prefix);
	content = content.replace(new RegExp(`^${prefix}`), '');
	
	const matches = content.match(commandRegex);

	if (!matches.length) {
		throw new Error(messages.invalidFormat);
	}
	
	if (!allCommands.includes(matches[0])) {
		throw new Error(messages.invalidCommand);
	}
	
	return {
		command: matches[0],
		params: matches.splice(1, matches.length).map(param => param.replace(/\"/g, ''))
	}
}

const processChannel = async (channel) => {
	// connect to DB and get channel data
	
	return {
		board: null
	}
}

const runCommand = async (commandData, channelData, channel) => {
	debug(`Running the "${commandData.command}" command`);
	switch(commandData.command) {
		case 'addBoard':
			
		break;
		case 'help':
			if (commandData.params.length) {
				const param = commandData.params[0];
				if (!helpMessages.hasOwnProperty(param)) {
					throw new Error(messages.helpInvalid);
				} else {
					await sendFormatted(channel, helpMessages[param]);
				}
			} else {
				await sendFormatted(channel, messages.genericHelp);
			}
		break;
		default:
			debug(`${commandData.command} isn't configured with this bot, but is registered as valid.`);
			throw new Error(messages.unknownError);
		break;
	}
	
	return true;
}

const sendFormatted = (channel, content, type, data = {}) => {
	return channel.send('', {
		embed: {
			title: type === 'error' ? 'Error' : 'TrelloMan',
			description: populateTemplate(content, data),
			color: type === 'error' ? hexToDecimal(msgConfig.colours.error) : hexToDecimal(msgConfig.colours.main),
		}
	});
}

const populateTemplate = (string, data) => {
	data = {
		authorizeLink: trelloLib.authorizeLink,
		...data
	}
	
	const unpopulated = string.match(/\{\{[A-z\.]*\}\}/g);
	
	
	unpopulated.map(unparsedVar => {
		var parsedVar = unparsedVar.replace(/\{|\}/g, '');
		var populated = get(data, parsedVar);
		
		if (populated) {
			string = string.replace(unparsedVar, populated);
		}
	});
	
	return string;
}

module.exports = {
	onMessage,
	sendMessage
}