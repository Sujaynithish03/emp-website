import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { saveSubmission, listSubmissions } from './storage.js';
import { sendContactNotification } from './email.js';
import { appendSubmission, getExcelFilePath, excelFileExists } from './excel.js';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json({ limit: '100kb' }));

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateContact(body) {
  const errors = [];
  const { name, email, interest, message } = body || {};

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    errors.push('Please enter your name.');
  }
  if (!email || typeof email !== 'string' || !EMAIL_RE.test(email.trim())) {
    errors.push('Please enter a valid email address.');
  }
  if (!interest || typeof interest !== 'string') {
    errors.push('Please select what you\'re interested in.');
  }
  if (!message || typeof message !== 'string' || message.trim().length < 5) {
    errors.push('Please include a short message.');
  }
  return errors;
}

app.get('/api/health', (req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

app.post('/api/contact', async (req, res) => {
  const errors = validateContact(req.body);
  if (errors.length) {
    return res.status(400).json({ error: errors.join(' ') });
  }

  const { name, email, interest, message } = req.body;
  const submission = {
    name: name.trim(),
    email: email.trim(),
    interest: interest.trim(),
    message: message.trim(),
  };

  try {
    const saved = saveSubmission(submission);

    // Mirror the submission into the Excel workbook. Non-fatal: the JSON store
    // above already holds the record, so a spreadsheet hiccup must not lose the
    // lead or fail the request for the visitor.
    let excelSaved = false;
    try {
      await appendSubmission(saved);
      excelSaved = true;
    } catch (excelErr) {
      console.error('[excel] failed to append submission:', excelErr.message);
    }

    let emailResult = { sent: false };
    try {
      emailResult = await sendContactNotification(submission);
    } catch (emailErr) {
      // Don't fail the request just because email delivery failed --
      // the submission is already safely persisted.
      console.error('[email] send failed:', emailErr.message);
    }
    res.status(201).json({ ok: true, id: saved.id, emailSent: emailResult.sent, excelSaved });
  } catch (err) {
    console.error('[contact] failed to save submission:', err);
    res.status(500).json({ error: 'Something went wrong on our end. Please try again shortly.' });
  }
});

// Simple admin-style endpoint to view stored submissions.
// In production, protect this with real authentication before exposing it.
app.get('/api/contact/submissions', (req, res) => {
  const token = req.headers['x-admin-token'];
  if (!process.env.ADMIN_TOKEN || token !== process.env.ADMIN_TOKEN) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  res.json(listSubmissions());
});

// Downloads the Excel workbook of all submissions. Same shared-secret guard as
// the JSON listing above — swap in real auth before exposing this publicly.
app.get('/api/contact/export', async (req, res) => {
  const token = req.headers['x-admin-token'];
  if (!process.env.ADMIN_TOKEN || token !== process.env.ADMIN_TOKEN) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  if (!(await excelFileExists())) {
    return res.status(404).json({ error: 'No submissions have been recorded yet.' });
  }
  const stamp = new Date().toISOString().slice(0, 10);
  res.download(getExcelFilePath(), `empowered-contact-submissions-${stamp}.xlsx`);
});

app.listen(PORT, () => {
  console.log(`EmpowerED Careers backend listening on http://localhost:${PORT}`);
});
