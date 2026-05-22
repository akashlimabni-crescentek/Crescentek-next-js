import fs from 'fs';
import path from 'path';

const root = path.resolve(import.meta.dirname, '..');
const reactSrc = path.resolve(root, '../crescentek/src/pages');
const viewsDir = path.join(root, 'src/views');

function transformServiceDetail(src) {
  let s = src;
  s = s.replace(
    /import \{ useParams, Link \} from 'react-router-dom';\n/,
    "import Link from '@/components/navigation/AppLink';\n"
  );
  s = s.replace(/import PageSeo from '@\/components\/seo\/PageSeo';\n/, '');
  s = s.replace(/import \{ SITE_ORIGIN \} from '@\/lib\/siteSeo';\n/, '');
  s = s.replace(
    'export default function ServiceDetail() {\n  const { slug } = useParams();',
    'export default function ServiceDetail({ slug }) {'
  );
  s = s.replace(/<PageSeo[\s\S]*?\/>\n/g, '');
  s = s.replace(/\bto=/g, 'to=');
  return `'use client';\n\n${s}`;
}

function transformAllServices(src) {
  let s = src;
  s = s.replace(
    /import \{ Link \} from 'react-router-dom';\n/,
    "import Link from '@/components/navigation/AppLink';\n"
  );
  s = s.replace(/import PageSeo from '@\/components\/seo\/PageSeo';\n/, '');
  s = s.replace(/<PageSeo[\s\S]*?\/>\n\n/, '');
  return `'use client';\n\n${s}`;
}

fs.mkdirSync(viewsDir, { recursive: true });

const serviceDetail = fs.readFileSync(path.join(reactSrc, 'ServiceDetail.jsx'), 'utf8');
fs.writeFileSync(path.join(viewsDir, 'ServiceDetail.jsx'), transformServiceDetail(serviceDetail));

const allServices = fs.readFileSync(path.join(reactSrc, 'AllServices.jsx'), 'utf8');
fs.writeFileSync(path.join(viewsDir, 'AllServices.jsx'), transformAllServices(allServices));

console.log('Prepared views/ServiceDetail.jsx and views/AllServices.jsx');
