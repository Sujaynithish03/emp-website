import React from 'react';
import { trackContactSubmission } from '../utils/analytics';

const INTEREST_OPTIONS = [
  'Students & Graduates — launch my career',
  'Working Professional — upskill / reskill',
  'University / Institution partnership',
  'Enterprise — build a talent pipeline',
  'Startup — product & talent on demand',
  'Government & Public Sector',
];

const EMPTY_FORM = {
  name: '',
  email: '',
  interest: INTEREST_OPTIONS[0],
  message: '',
};

const SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

export default function ContactSection({ embedded = false }) {
  const [form, setForm] = React.useState(EMPTY_FORM);
  const [status, setStatus] = React.useState('idle');
  const [errorMessage, setErrorMessage] = React.useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus('sending');
    setErrorMessage('');

    if (!SCRIPT_URL) {
      setStatus('error');
      setErrorMessage('The contact form is not configured yet. Please try again later.');
      return;
    }

    try {
      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          interest: form.interest,
          message: form.message,
        }),
      });

      trackContactSubmission();
      setForm(EMPTY_FORM);
      setStatus('success');
    } catch {
      setStatus('error');
      setErrorMessage('We could not send your message. Please check your connection and try again.');
    }
  };

  return (
    <section
      id="contact"
      className={`contact-section${embedded ? ' contact-section--embedded' : ''}`}
      aria-labelledby="contact-heading"
    >
      <div className="contact-section-inner">
        <div className="contact-section-copy">
          <span className="eyebrow">Contact</span>
          <h2 id="contact-heading">Get in touch</h2>
          <p className="muted">We're here to help you build your career or your workforce.</p>
        </div>

        <form className="form contact-form reveal" onSubmit={handleSubmit}>
          <label htmlFor="cf-name">Name</label>
          <input
            id="cf-name"
            name="name"
            type="text"
            placeholder="Your name"
            value={form.name}
            onChange={handleChange}
            autoComplete="name"
            required
          />

          <label htmlFor="cf-email">Email</label>
          <input
            id="cf-email"
            name="email"
            type="email"
            placeholder="you@company.com"
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
            required
          />

          <label htmlFor="cf-interest">I'm interested in</label>
          <select id="cf-interest" name="interest" value={form.interest} onChange={handleChange} required>
            {INTEREST_OPTIONS.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>

          <label htmlFor="cf-message">Message</label>
          <textarea
            id="cf-message"
            name="message"
            rows="4"
            placeholder="Tell us about your goals…"
            value={form.message}
            onChange={handleChange}
            required
          />

          <button type="submit" className="btn btn-yellow" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : 'Send message'}
          </button>

          <p className="contact-form-message" aria-live="polite" role={status === 'error' ? 'alert' : 'status'}>
            {status === 'success' && "Thanks — we've received your message and will be in touch shortly."}
            {status === 'error' && errorMessage}
          </p>
        </form>
      </div>
    </section>
  );
}
