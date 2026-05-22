import fs from 'fs';
import path from 'path';

const root = path.resolve(import.meta.dirname, '..');
const reactPages = path.resolve(root, '../crescentek/src/pages');
const viewsDir = path.join(root, 'src/views');

function addClient(s) {
  return s.startsWith("'use client'") ? s : `'use client';\n\n${s}`;
}

function transformAbout(src) {
  let s = src;
  s = s.replace(/import PageSeo from '@\/components\/seo\/PageSeo';\n/, '');
  s = s.replace(/<PageSeo[\s\S]*?\/>\n\n/, '');
  s = s.replace(/from '\.\.\/components\//g, "from '@/components/");
  s = s.replace(/import \{ useRef, useEffect, useState \} from 'react';\n/, '');
  return addClient(s);
}

function transformContact(src) {
  let s = src;
  s = s.replace(/import PageSeo from '@\/components\/seo\/PageSeo';\n/, '');
  s = s.replace(/import \{ SITE_ORIGIN \} from '@\/lib\/siteSeo';\n/, '');
  s = s.replace(/<PageSeo[\s\S]*?\/>\n/, '');
  s = s.replace(/from '\.\.\/components\//g, "from '@/components/");
  return addClient(s);
}

fs.mkdirSync(viewsDir, { recursive: true });

fs.writeFileSync(
  path.join(viewsDir, 'About.jsx'),
  transformAbout(fs.readFileSync(path.join(reactPages, 'About.jsx'), 'utf8'))
);
fs.writeFileSync(
  path.join(viewsDir, 'Contact.jsx'),
  transformContact(fs.readFileSync(path.join(reactPages, 'Contact.jsx'), 'utf8'))
);

console.log('wrote About.jsx and Contact.jsx');
