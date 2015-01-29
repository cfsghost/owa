#!/usr/bin/env node

var commander = require('commander');
var path = require('path');
var fse = require('fs-extra');

commander
	.version('0.0.1')
	.command('init [option] <template>', 'create and initialize a new project')
	.parse(process.argv);
