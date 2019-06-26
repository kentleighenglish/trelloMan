const express = require('express');
const config = require('config');
const debug = require('debug')('app:server');
const path = require('path');

const app = express();

app.use(express.static(path.resolve('static')));

app.get('/', (request, response) => {
	response.sendFile(path.resolve('views', 'index.html'));
});

app.listen(config.port, () => {
	debug(`Server has started on port ${config.port}`);
})
