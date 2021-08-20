#!/usr/bin/env node

const fs = require('fs/promises');
const nunjucks = require('nunjucks');

const renderTemplate = async (fileName) => {
  await fs.writeFile(`public/${fileName}`, nunjucks.render(`src/${fileName}`));
};

Promise.all([
  renderTemplate('index.html'),
  renderTemplate('404.html'),
]);
