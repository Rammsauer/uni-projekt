const path = require('path');

module.exports = {
	clientPath: path.resolve(__dirname, 'client'),
	serverPath: path.resolve(__dirname, 'server'),

	docsPath: path.resolve(__dirname, 'documentation'),
	buildPath: path.resolve(__dirname, 'dist'),

	processUid: 'staging',

	deployAppPath: 'staging/',
	deployDocPath: 'public_html/staging',

	production: false
};