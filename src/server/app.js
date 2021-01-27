const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const handlebars = require('handlebars');
const exphbs = require('express-handlebars');

module.exports = function() {
  const hbs = exphbs.create({
    defaultLayout: `${__dirname}/views/layout`,
    handlebars,
    partialsDir: `${__dirname}/views/partials/`,
    extname: 'hbs'
  });

  require('handlebars-helpers')({handlebars});

  const app = express();

  let configPath = path.join(__dirname, 'config', 'index.json');
  if (fs.existsSync(path.join(__dirname, 'config', 'index.override.js'))) {
    configPath = path.join(__dirname, 'config', 'index.override.js');
  } else if (fs.existsSync(path.join(__dirname, 'config', 'index.override.json'))) {
    configPath = path.join(__dirname, 'config', 'index.override.json');
  }

  const defaultConfig = require(configPath);

  const Queues = require('./queue');

  const queues = new Queues(defaultConfig);
  require('./views/helpers/handlebars')(handlebars, { queues });
  app.locals.Queues = queues;
  app.locals.appBasePath = '';
  app.locals.vendorPath = '/vendor';

  app.set('views', `${__dirname}/views`);
  app.set('view engine', 'hbs');
  app.set('json spaces', 2);

  app.engine('hbs', hbs.engine);

  app.use(bodyParser.json());

  return {
    app,
    Queues: app.locals.Queues
  };
};
