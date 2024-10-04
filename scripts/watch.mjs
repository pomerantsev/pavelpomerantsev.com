import { watch } from 'node:fs/promises';
import renderAll from './renderAll.mjs';

const watcher = watch('./src');
for await (const event of watcher) {
  console.log('Re-rendering:', event);
  await renderAll();
}
