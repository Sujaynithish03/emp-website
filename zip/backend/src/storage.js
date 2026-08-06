import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_FILE = path.join(__dirname, '..', 'data', 'submissions.json');

function ensureFile() {
  if (!fs.existsSync(DATA_FILE)) {
    fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
    fs.writeFileSync(DATA_FILE, '[]', 'utf-8');
  }
}

export function saveSubmission(entry) {
  ensureFile();
  const all = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
  all.push({ ...entry, id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8), receivedAt: new Date().toISOString() });
  fs.writeFileSync(DATA_FILE, JSON.stringify(all, null, 2), 'utf-8');
  return all[all.length - 1];
}

export function listSubmissions() {
  ensureFile();
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
}
