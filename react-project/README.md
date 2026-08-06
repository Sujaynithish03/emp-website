# EmpowerED Careers — Full-Stack Project

A React frontend (matching your original project's stack: React 19, Vite 8, React
Router v7, Tailwind v4) plus an Express backend for the contact form.

## Structure

```
frontend/   React + Vite app — all 7 pages, routing, real illustrations
backend/    Express API — handles contact form submissions
```

## Running it locally

You need two terminals — the backend and frontend run as separate processes.

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env    # optional — see "Email notifications" below
npm run dev
```

Runs on **http://localhost:4000**. Health check: `GET /api/health`.

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

Runs on **http://localhost:5173**. The dev server automatically proxies any
`/api/*` request to the backend (configured in `vite.config.js`), so the
contact form works out of the box with both servers running.

### Production build

```bash
cd frontend
npm run build      # outputs to frontend/dist/
npm run preview    # serve the production build locally to check it
```

For a real deployment, you'd serve `frontend/dist/` as static files (any static
host — Netlify, Vercel, S3+CloudFront, nginx) and run `backend/` as a Node
process behind your API domain, updating the frontend's proxy/fetch URL to
point at wherever the backend actually lives in production.

## What's in the frontend

- **7 pages**, each a real component: Home, Programs, AI for Everyone,
  Solutions, Career Paths, About, Contact — routed with React Router v7
  (`src/App.jsx`)
- **`src/components/Layout.jsx`** — header, nav (with the Solutions dropdown),
  mobile menu, footer, shared across every page via a route-level `<Outlet />`
- Real navigation: clicking around uses actual URLs (`/programs`,
  `/solutions`, etc.) instead of the hash-based fake routing in the original
  mockup. Anchored links (e.g. nav items that jump to a specific section)
  still work — I added a small hook in Layout that scrolls to the right
  element after navigating.
- **All ~90 illustrations are real image files** in `src/assets/`, imported
  properly through auto-generated manifest files (`manifest.js`,
  `figuresManifest.js`, `pngManifest.js`) rather than embedded as base64 —
  much better for load performance and cacheability.
- **The hero now shows your actual logo** instead of the handshake
  illustration, per your last request.
- The Contact page is a real controlled form (not the placeholder `alert()`
  from the mockup) — it posts to `/api/contact` and shows a proper
  loading/success/error state.

## What's in the backend

A small, honest Express API — not over-engineered, but genuinely functional:

- `POST /api/contact` — validates the submission, saves it to
  `backend/data/submissions.json`, and optionally emails a notification if
  SMTP is configured (see below). If email isn't configured, submissions are
  still saved — nothing is silently lost.
- `GET /api/contact/submissions` — lists saved submissions. Protected by a
  simple shared-secret header (`x-admin-token`) — set `ADMIN_TOKEN` in
  `backend/.env` and pass the same value in that header to use it. This is
  fine for internal/admin use during development; swap in real
  authentication before this is public-facing.
- `GET /api/health` — basic uptime check.

### Email notifications (optional)

By default, contact submissions are saved to a file and no email is sent —
the backend logs this and returns success normally. To also send an email
notification when someone submits the form, fill in `backend/.env`:

```
SMTP_HOST=smtp.yourprovider.com
SMTP_PORT=587
SMTP_USER=you@yourdomain.com
SMTP_PASS=your-smtp-password
CONTACT_NOTIFY_TO=hello@empoweredcareers.ai
```

### Swapping the storage layer

Submissions are stored as JSON in `backend/data/submissions.json` for
simplicity — no database setup required to try this out. `backend/src/storage.js`
is a thin, isolated module; swapping it for a real database (Postgres, MongoDB,
etc.) means changing that one file without touching the API routes.

## Honest notes on what's simplified

- **Styling is one global stylesheet** (`src/index.css`), ported directly
  from the approved mockup, rather than fully rewritten as atomic Tailwind
  utility classes. Tailwind is wired up and ready to use for anything new you
  build, but converting ~1,400 lines of bespoke CSS (gradients, custom grid
  layouts, animations) into pure utility classes by hand would be a large,
  error-prone undertaking with no visual benefit — this is a completely
  normal, common approach even in Tailwind-based projects.
- **The `/terms`, `/privacy`, and `/cookies` pages are placeholders** — the
  original mockup never had real legal content, so these exist as real routes
  with placeholder text rather than broken links.
- I verified the backend end-to-end (health check, submission, persistence)
  and confirmed the frontend builds cleanly with **zero errors** via
  `npm run build`. I was not able to keep a live multi-process dev-server
  session open long enough in this environment to click through every page
  in a real browser myself — if anything looks off once you run it locally,
  send a screenshot the way you have throughout this project and I'll fix it
  precisely.
