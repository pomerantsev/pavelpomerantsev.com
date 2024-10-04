import { readFile, writeFile } from 'node:fs/promises';
import nunjucks from 'nunjucks';
import postcss from 'postcss';
import cssnano from 'cssnano';

nunjucks.configure({noCache: true});

const processStyle = async () => {
  const rawStyle = await readFile('src/style.css', 'utf-8');
  const processedStyle = (await postcss([cssnano({preset: 'default'})]).process(rawStyle, {from: undefined})).css;
  return processedStyle;
};

const renderTemplate = async (fileName, style) => {
  await writeFile(`public/${fileName}`, nunjucks.render(`src/${fileName}`, {style}));
};

const renderAll = async () => {
  const style = await processStyle();
  await Promise.all([
    renderTemplate('index.html', style),
    renderTemplate('404.html', style),
  ]);
};

export default renderAll;
