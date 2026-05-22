import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const root = path.resolve(import.meta.dirname, '..');
const reactRoot = path.resolve(root, '../crescentek');
const publicDir = path.join(root, 'public');

function copyDir(src, dest) {
  if (!fs.existsSync(src)) {
    console.warn('skip (missing):', src);
    return;
  }
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const from = path.join(src, entry.name);
    const to = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(from, to);
    else fs.copyFileSync(from, to);
  }
}

function copyFile(src, dest) {
  if (!fs.existsSync(src)) {
    console.warn('skip (missing):', src);
    return;
  }
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
}

// React Vite public folder → Next public
copyDir(path.join(reactRoot, 'public'), publicDir);

// Portfolio images → public/images/portfolio/{apps,sites}
copyDir(path.join(reactRoot, 'src/assets/apps'), path.join(publicDir, 'images/portfolio/apps'));
copyDir(path.join(reactRoot, 'src/assets/sites'), path.join(publicDir, 'images/portfolio/sites'));

// Brand logo alias under /logos for structured public folder
copyFile(
  path.join(publicDir, 'brand-logo.png'),
  path.join(publicDir, 'logos/brand-logo.png')
);

// Real .ico in public for direct /favicon.ico requests
const appDir = path.join(root, 'src/app');
const faviconPng = path.join(publicDir, 'favicon.png');
if (fs.existsSync(faviconPng)) {
  const icon32 = path.join(appDir, 'icon.png');
  const appleIcon = path.join(appDir, 'apple-icon.png');
  const faviconIco = path.join(appDir, 'favicon.ico');
  const publicIco = path.join(publicDir, 'favicon.ico');
  fs.mkdirSync(appDir, { recursive: true });
  execSync(`sips -z 32 32 "${faviconPng}" --out "${icon32}"`, { stdio: 'inherit' });
  execSync(`sips -z 180 180 "${faviconPng}" --out "${appleIcon}"`, { stdio: 'inherit' });
  execSync(`sips -s format ico "${icon32}" --out "${faviconIco}"`, { stdio: 'inherit' });
  fs.copyFileSync(faviconIco, publicIco);
}

console.log('Synced public assets from React project →', publicDir);
