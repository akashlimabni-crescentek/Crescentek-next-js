import fs from 'fs';
import path from 'path';

const root = path.resolve(import.meta.dirname, '..');
const reactRoot = path.resolve(root, '../crescentek/src');
const viewsDir = path.join(root, 'src/views');
const caseStudiesDir = path.join(viewsDir, 'case-studies');

function addClient(s) {
  return s.startsWith("'use client'") ? s : `'use client';\n\n${s}`;
}

function fixImports(s) {
  return s
    .replace(/from '\.\.\/\.\.\/components\//g, "from '@/components/")
    .replace(/from '\.\.\/components\//g, "from '@/components/");
}

function stripPageSeo(s) {
  return s.replace(/import PageSeo from '@\/components\/seo\/PageSeo';\n/g, '').replace(/<PageSeo[\s\S]*?\/>\n/g, '');
}

function linkToAppLink(s) {
  return s
    .replace(/import \{ Link \} from 'react-router-dom';\n/g, "import Link from '@/components/navigation/AppLink';\n")
    .replace(/import \{ Link, useParams \} from 'react-router-dom';\n/g, "import Link from '@/components/navigation/AppLink';\n");
}

function transformWork(src) {
  let s = src;
  s = linkToAppLink(s);
  s = stripPageSeo(s);
  s = s.replace(/from '\.\.\/assets\//g, "from '@/assets/");
  return addClient(s);
}

function transformCaseStudyList(src) {
  let s = src;
  s = linkToAppLink(s);
  s = stripPageSeo(s);
  return addClient(s);
}

function transformCaseStudyDetail(src) {
  let s = src;
  s = s.replace(
    /import \{ Link, useParams \} from 'react-router-dom';\n/,
    "import Link from '@/components/navigation/AppLink';\n"
  );
  s = s.replace(/import KelvinRolfCaseStudy from '\.\/case-studies\//g, "import KelvinRolfCaseStudy from '@/views/case-studies/");
  s = s.replace(/from '\.\/case-studies\//g, "from '@/views/case-studies/");
  s = stripPageSeo(s);
  s = s.replace(
    'export default function CaseStudy() {\n  const { slug } = useParams();',
    'export default function CaseStudyDetail({ slug }) {'
  );
  return addClient(s);
}

function transformCaseStudyFile(src) {
  let s = fixImports(linkToAppLink(stripPageSeo(src)));
  return addClient(s);
}

fs.mkdirSync(caseStudiesDir, { recursive: true });

const work = fs.readFileSync(path.join(reactRoot, 'pages/Work.jsx'), 'utf8');
fs.writeFileSync(path.join(viewsDir, 'Work.jsx'), transformWork(work));

const list = fs.readFileSync(path.join(reactRoot, 'pages/CaseStudyList.jsx'), 'utf8');
fs.writeFileSync(path.join(viewsDir, 'CaseStudyList.jsx'), transformCaseStudyList(list));

const detail = fs.readFileSync(path.join(reactRoot, 'pages/CaseStudyDetail.jsx'), 'utf8');
fs.writeFileSync(path.join(viewsDir, 'CaseStudyDetail.jsx'), transformCaseStudyDetail(detail));

const csFiles = fs.readdirSync(path.join(reactRoot, 'pages/case-studies')).filter((f) => f.endsWith('.jsx'));
for (const file of csFiles) {
  const raw = fs.readFileSync(path.join(reactRoot, 'pages/case-studies', file), 'utf8');
  fs.writeFileSync(path.join(caseStudiesDir, file), transformCaseStudyFile(raw));
  console.log('wrote case-studies/', file);
}

console.log('wrote Work.jsx, CaseStudyList.jsx, CaseStudyDetail.jsx');
