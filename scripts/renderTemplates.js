#!/usr/bin/env node

const fs = require('fs/promises');
const nunjucks = require('nunjucks');
const postcss = require('postcss');
const cssnano = require('cssnano');

const processStyle = async () => {
  const rawStyle = await fs.readFile('src/style.css', 'utf-8');
  const processedStyle = (await postcss([cssnano({preset: 'default'})]).process(rawStyle, {from: undefined})).css;
  return processedStyle;
};

const renderTemplate = async (fileName, style) => {
  await fs.writeFile(`public/${fileName}`, nunjucks.render(`src/${fileName}`, {style}));
};

processStyle().then(style =>
  Promise.all([
    renderTemplate('index.html', style),
    renderTemplate('404.html', style),
  ])
);
