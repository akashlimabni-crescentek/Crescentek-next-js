import fs from 'fs';
import path from 'path';

const root = path.resolve(import.meta.dirname, '..');
const reactPages = path.resolve(root, '../crescentek/src/pages');
const viewsDir = path.join(root, 'src/views');

function addClientDirective(s) {
  return s.startsWith("'use client'") ? s : `'use client';\n\n${s}`;
}

function transformPartnership(src) {
  let s = src;
  s = s.replace(/import \{ Link \} from 'react-router-dom';\n/, "import Link from '@/components/navigation/AppLink';\n");
  s = s.replace(/import PageSeo from '@\/components\/seo\/PageSeo';\n/, '');
  s = s.replace(/<PageSeo[\s\S]*?\/>\n\n/, '');
  return addClientDirective(s);
}

function transformPartnershipDetail(src) {
  let s = src;
  s = s.replace(
    /import \{ Link, useParams \} from 'react-router-dom';\n/,
    "import Link from '@/components/navigation/AppLink';\n"
  );
  s = s.replace(/import PageSeo from '@\/components\/seo\/PageSeo';\n/, '');
  s = s.replace(
    'export default function PartnershipDetail() {\n  const { slug } = useParams();',
    'export default function PartnershipDetail({ slug }) {'
  );
  s = s.replace(/<PageSeo[\s\S]*?\/>\n/g, '');
  return addClientDirective(s);
}

fs.mkdirSync(viewsDir, { recursive: true });

for (const [name, transform] of [
  ['Partnership.jsx', transformPartnership],
  ['PartnershipDetail.jsx', transformPartnershipDetail],
]) {
  const raw = fs.readFileSync(path.join(reactPages, name), 'utf8');
  fs.writeFileSync(path.join(viewsDir, name), transform(raw));
  console.log('wrote', name);
}
