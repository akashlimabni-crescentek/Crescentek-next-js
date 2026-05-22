import fs from 'fs';
import path from 'path';

const root = path.resolve(import.meta.dirname, '../src');

const files = [];
function walk(dir) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p);
    else if (/\.(jsx|js|tsx|ts)$/.test(ent.name)) files.push(p);
  }
}
walk(root);

for (const file of files) {
  let s = fs.readFileSync(file, 'utf8');
  if (!s.includes('react-router-dom')) continue;

  s = s.replace(
    /import\s*\{\s*Link\s*\}\s*from\s*['"]react-router-dom['"];?\n?/g,
    "import Link from '@/components/navigation/AppLink';\n"
  );
  s = s.replace(
    /import\s*\{\s*Link\s*,\s*useLocation\s*\}\s*from\s*['"]react-router-dom['"];?\n?/g,
    "import Link from '@/components/navigation/AppLink';\nimport { usePathname } from 'next/navigation';\n"
  );
  s = s.replace(
    /import\s*\{\s*useLocation\s*\}\s*from\s*['"]react-router-dom['"];?\n?/g,
    "import { usePathname } from 'next/navigation';\n"
  );
  s = s.replace(/\bconst location = useLocation\(\);?/g, 'const pathname = usePathname();');
  s = s.replace(/\blocation\.pathname\b/g, 'pathname');

  fs.writeFileSync(file, s);
  console.log('updated', path.relative(root, file));
}
