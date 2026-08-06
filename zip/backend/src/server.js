import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { saveSubmission, listSubmissions } from './storage.js';
import { sendContactNotification } from './email.js';

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
    let emailResult = { sent: false };
    try {
      emailResult = await sendContactNotification(submission);
    } catch (emailErr) {
      // Don't fail the request just because email delivery failed --
      // the submission is already safely persisted.
      console.error('[email] send failed:', emailErr.message);
    }
    res.status(201).json({ ok: true, id: saved.id, emailSent: emailResult.sent });
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

app.listen(PORT, () => {
  console.log(`EmpowerED Careers backend listening on http://localhost:${PORT}`);
});
