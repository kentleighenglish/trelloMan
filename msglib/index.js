const debug = require('debug')('app:msglib');
const debugErr = require('debug')('app:error');
const { msg: msgConfig, messages } = require('config');

const regexEscape = string => string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

const allCommands = [].concat(msgConfig.commands, msgConfig.boardCommands);

const sendFormatted = (channel, content, type) => {	
	return channel.send('', {
		embed: {
			title: type === 'error' ? 'Error' : 'TrelloMan',
			description: content,
			color: type === 'error' ? 16711680 : 2671515,
		}
	});
}

const onMessage = async ({ member, content, channel, author, ...msg }) => {
	if (content.indexOf(msgConfig.prefix+' ') === 0 && member.hasPermission('ADMINISTRATOR')) {
		debug(`Received command from @${author.username}`);
		
		try {
			const commandData = await processContent(content);
			const channelData = await processChannel(channel);
			
			if (msgConfig.boardCommands.includes(commandData.command)) {
				
			}
		} catch(e) {
			debugErr(e);
			await sendFormatted(channel, e.message, 'error');
		}
	}
}

const commandRegex = new RegExp('\\".+\\"|[^\\s]+', 'g');

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
		params: matches.splice(1, matches.length)
	}
}

const processChannel = async (channel) => {
	// connect to DB and get channel data
}

module.exports = {
	onMessage
}