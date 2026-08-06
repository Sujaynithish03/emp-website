import path from 'node:path';
import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import ExcelJS from 'exceljs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FILE_PATH = path.join(__dirname, '..', 'data', 'contact-submissions.xlsx');
const SHEET_NAME = 'Submissions';

// `key` must match the property names passed to appendSubmission so ExcelJS
// maps each value to the right column.
const COLUMNS = [
  { header: 'Received At', key: 'receivedAt', width: 22 },
  { header: 'Name', key: 'name', width: 26 },
  { header: 'Email', key: 'email', width: 30 },
  { header: 'Interested In', key: 'interest', width: 40 },
  { header: 'Message', key: 'message', width: 60 },
  { header: 'ID', key: 'id', width: 18 },
];

// An .xlsx file is a single archive with no row-level locking, so two
// simultaneous submissions would race on read-modify-write. Serialise every
// operation through one promise chain (a lightweight in-process mutex).
let writeQueue = Promise.resolve();

function enqueue(task) {
  const run = writeQueue.then(task, task);
  // Swallow errors on the chain itself so one failure can't poison the queue;
  // the caller still receives the rejection through `run`.
  writeQueue = run.catch(() => {});
  return run;
}

async function fileExists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

function styleHeader(sheet) {
  const header = sheet.getRow(1);
  header.font = { bold: true, color: { argb: 'FFFFFFFF' } };
  header.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FF155F4B' }, // brand green
  };
  header.alignment = { vertical: 'middle' };
  header.height = 20;
  sheet.views = [{ state: 'frozen', ySplit: 1 }];
}

async function loadOrCreateWorkbook() {
  const workbook = new ExcelJS.Workbook();

  if (await fileExists(FILE_PATH)) {
    await workbook.xlsx.readFile(FILE_PATH);
    let sheet = workbook.getWorksheet(SHEET_NAME);
    if (!sheet) {
      sheet = workbook.addWorksheet(SHEET_NAME);
      sheet.columns = COLUMNS;
      styleHeader(sheet);
    }
    return { workbook, sheet };
  }

  const sheet = workbook.addWorksheet(SHEET_NAME);
  sheet.columns = COLUMNS;
  styleHeader(sheet);
  return { workbook, sheet };
}

/**
 * Appends one contact submission as a new row and persists the workbook.
 * Safe to call concurrently — calls are serialised internally.
 *
 * @param {object} submission - { receivedAt, name, email, interest, message, id }
 */
export function appendSubmission(submission) {
  return enqueue(async () => {
    await fs.mkdir(path.dirname(FILE_PATH), { recursive: true });
    const { workbook, sheet } = await loadOrCreateWorkbook();

    sheet.addRow({
      ...submission,
      receivedAt:
        submission.receivedAt instanceof Date
          ? submission.receivedAt
          : new Date(submission.receivedAt || Date.now()),
    });

    // Write to a temp file then rename, so a crash mid-write can't corrupt the
    // existing workbook (atomic replace on the same filesystem).
    const tmpPath = `${FILE_PATH}.tmp`;
    await workbook.xlsx.writeFile(tmpPath);
    await fs.rename(tmpPath, FILE_PATH);
  });
}

export function getExcelFilePath() {
  return FILE_PATH;
}

export function excelFileExists() {
  return fileExists(FILE_PATH);
}
