const express = require('express');
const config = require('config');
const debug = require('debug')('app:server');

const app = express();

app.get('/', (request, response) => {
	
});

app.listen(config.port, () => {
	debug(`Server has started on port ${config.port}`);
})