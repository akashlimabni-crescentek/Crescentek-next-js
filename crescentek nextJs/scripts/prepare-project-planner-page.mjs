import fs from 'fs';
import path from 'path';

const root = path.resolve(import.meta.dirname, '..');
const reactPage = path.join(root, '../crescentek/src/pages/ProjectPlanner.jsx');
const plannerDir = path.join(root, 'src/components/planner');

function syncPlannerComponents() {
  const reactPlanner = path.join(root, '../crescentek/src/components/planner');
  if (!fs.existsSync(reactPlanner)) return;
  fs.mkdirSync(plannerDir, { recursive: true });
  for (const file of fs.readdirSync(reactPlanner)) {
    if (!file.endsWith('.jsx')) continue;
    fs.copyFileSync(path.join(reactPlanner, file), path.join(plannerDir, file));
  }
}

syncPlannerComponents();
console.log('synced planner components from React app');
console.log('source page:', reactPage, fs.existsSync(reactPage) ? 'ok' : 'missing');
