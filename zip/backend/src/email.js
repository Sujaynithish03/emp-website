import nodemailer from 'nodemailer';

let transporter = null;

function getTransporter() {
  if (transporter) return transporter;
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    return null; // not configured — caller should skip sending
  }
  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 587,
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
  return transporter;
}

export async function sendContactNotification(submission) {
  const t = getTransporter();
  if (!t) {
    console.log('[email] SMTP not configured — skipping email send. Submission was still saved.');
    return { sent: false, reason: 'SMTP not configured' };
  }

  const to = process.env.CONTACT_NOTIFY_TO || process.env.SMTP_USER;
  const subject = `New contact form submission — ${submission.name}`;
  const text = [
    `Name: ${submission.name}`,
    `Email: ${submission.email}`,
    `Interest: ${submission.interest}`,
    '',
    'Message:',
    submission.message,
  ].join('\n');

  await t.sendMail({
    from: process.env.SMTP_USER,
    to,
    replyTo: submission.email,
    subject,
    text,
  });

  return { sent: true };
}
