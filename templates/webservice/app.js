"use strict";

var path = require('path');
var koa = require('koa');
var Router = require('koa-router');
var bodyParser = require('koa-bodyparser');
var views = require('co-views');
var serve = require('koa-static');
var session = require('koa-session');

var app = koa();

// Static file path
app.use(serve(__dirname + '/public'));

// Enabling BODY
app.use(bodyParser());

// Loading settings
try {

	var settings = {
		general: require(path.join(__dirname, 'configs', 'general.json'))
	};
} catch(e) {
	console.error('Failed to load settings');
	console.error(e);
	process.exit(1);
}

// Initializing session mechanism
app.keys = settings.general.session.keys || [];
app.use(session());

// Create render
var render = views(__dirname + '/views', { ext: 'jade' });

// APIs
var general = new Router();
general.get('/', function *() {

    this.body = yield render('index');
});

general.post('/', function *() {
    this.body = 'done';
});

app.use(general.middleware());

app.listen(3000);
