const { setWorldConstructor } = require('@cucumber/cucumber');
const { AppWorld } = require('./app-world.mjs');

setWorldConstructor(AppWorld);