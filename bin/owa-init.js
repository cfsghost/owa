#!/usr/bin/env node

var commander = require('commander');
var path = require('path');
var fse = require('fs-extra');

commander
	.version('0.0.1')
	.usage('[option] <template>')
	.parse(process.argv);

if (commander.args.length == 0) {
	console.error('template name required');
	process.exit(1);
}

var templateBase = path.join(__dirname, '..', 'templates');

var templatePath = path.join(templateBase, commander.args[0]);
fse.exists(templatePath, function(exists) {

	// No such template
	if (!exists) {
		console.error('No such template');
		return;
	}

	fse.copy(templatePath, './', function(err) {
		if (err) {
			console.error(err);
			return;
		}

		console.log('Created');
	}); 
});
