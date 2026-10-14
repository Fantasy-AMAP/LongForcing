import { readFile, writeFile, rm } from 'node:fs/promises';
import { render } from '../.prerender/prerender.js';
const file = new URL('../dist/index.html', import.meta.url);
const html = await readFile(file, 'utf8');
await writeFile(file, html.replace('<!--app-html-->', render()));
await rm(new URL('../.prerender/', import.meta.url), { recursive: true });
