const { host, trello: { key } } = require('config');

const authorizeLink = `https://trello.com/1/authorize?key=${key}&name=TrelloMan&return_url=${host}/authorize`;

const authorize = () => {
	
}

module.exports = {
	authorize,
	authorizeLink
}