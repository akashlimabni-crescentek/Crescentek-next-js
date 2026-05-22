import fs from 'fs';
import path from 'path';

const root = path.resolve(import.meta.dirname, '..');
const reactPages = path.resolve(root, '../crescentek/src/pages');
const viewsDir = path.join(root, 'src/views');

function addClientDirective(s) {
  return s.startsWith("'use client'") ? s : `'use client';\n\n${s}`;
}

function transformTechnologies(src) {
  let s = src;
  s = s.replace(/import \{ Link \} from 'react-router-dom';\n/, "import Link from '@/components/navigation/AppLink';\n");
  s = s.replace(/import PageSeo from '@\/components\/seo\/PageSeo';\n/, '');
  s = s.replace(/<PageSeo[\s\S]*?\/>\n\n/, '');
  return addClientDirective(s);
}

function transformCategoryPage(src) {
  let s = src;
  s = s.replace(
    /import \{ useParams, Link \} from 'react-router-dom';\n/,
    "import Link from '@/components/navigation/AppLink';\n"
  );
  s = s.replace(
    'export default function TechnologyCategoryPage() {\n  const { slug } = useParams();',
    'export default function TechnologyCategoryPage({ slug }) {'
  );
  return addClientDirective(s);
}

function transformTechnologyDetail(src) {
  let s = src;
  s = s.replace(
    /import \{ Link, useParams \} from 'react-router-dom';\n/,
    "import Link from '@/components/navigation/AppLink';\n"
  );
  s = s.replace(
    'export default function TechnologyDetail() {\n  const { slug } = useParams();',
    'export default function TechnologyDetail({ slug }) {'
  );
  return addClientDirective(s);
}

fs.mkdirSync(viewsDir, { recursive: true });

const files = [
  ['Technologies.jsx', transformTechnologies],
  ['TechnologyCategoryPage.jsx', transformCategoryPage],
  ['TechnologyDetail.jsx', transformTechnologyDetail],
];

for (const [name, transform] of files) {
  const src = fs.readFileSync(path.join(reactPages, name), 'utf8');
  const outName = name;
  fs.writeFileSync(path.join(viewsDir, outName), transform(src));
  console.log('wrote', outName);
}
