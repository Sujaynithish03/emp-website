# EmpowerED Careers Website - Design Documentation

## Project Overview

EmpowerED Careers is a next-generation Talent Transformation Company website showcasing the AI Talent Factory platform. The website serves as the primary marketing and engagement hub for professionals, enterprises, and institutions interested in enterprise-ready AI workforce development.

## Architecture

### Tech Stack

**Frontend:**
- React 19.2.7
- React Router DOM 7.18.0
- Vite 8.1.0 (build tool)
- Tailwind CSS 4.3.1
- ES Modules

**Backend:**
- Node.js + Express
- Nodemailer (SMTP email)
- dotenv (environment configuration)
- CORS enabled

## Project Structure

```
d:\new web\
├── zip/
│   ├── frontend/
│   │   ├── src/
│   │   │   ├── pages/
│   │   │   │   ├── Home.jsx
│   │   │   │   ├── About.jsx
│   │   │   │   ├── AIForEveryone.jsx
│   │   │   │   ├── CareerPaths.jsx
│   │   │   │   ├── Programs.jsx
│   │   │   │   ├── Solutions.jsx
│   │   │   │   ├── Contact.jsx
│   │   │   │   └── Legal.jsx
│   │   │   ├── components/
│   │   │   │   ├── Layout.jsx
│   │   │   │   ├── IntroTransition.jsx (intro animation)
│   │   │   │   ├── FactoryModel.jsx
│   │   │   │   ├── TalentPipeline.jsx
│   │   │   │   └── career-paths/
│   │   │   ├── assets/
│   │   │   │   ├── manifest.js (asset registry)
│   │   │   │   ├── *.webp (images)
│   │   │   │   └── public/assets/*.mp4 (videos)
│   │   │   ├── App.jsx (router)
│   │   │   ├── main.jsx (entry point)
│   │   │   └── index.css (global styles)
│   │   ├── public/
│   │   │   └── assets/
│   │   │       ├── empowered-intro.mp4
│   │   │       ├── empowered-intro-mobile.mp4
│   │   │       └── intro-poster.jpg
│   │   ├── index.html
│   │   ├── package.json
│   │   └── vite.config.js
│   │
│   └── backend/
│       ├── src/
│       │   ├── server.js (Express API)
│       │   ├── email.js (Nodemailer SMTP)
│       │   └── storage.js (submission persistence)
│       ├── data/
│       │   └── submissions.json
│       ├── .env.example
│       └── package.json
│
└── .git/ (version control)
```

## Frontend Architecture

### Routing

React Router configuration in `App.jsx`:
- `/` - Home page (hero + factory model)
- `/about` - About section
- `/ai-for-everyone` - AI For Everyone program
- `/career-paths` - Career progression tracks
- `/programs` - Program offerings
- `/solutions` - Industry solutions
- `/contact` - Contact form
- `/legal` - Legal pages

### Components

**Layout.jsx** - Wrapper component providing:
- Site header (navigation)
- Page rendering
- Footer

**IntroTransition.jsx** - Intro animation:
- Shattering glass effect with handshake video
- CSS animations for visual impact
- Video fallback with canvas-based handshake animation
- Plays once on first page load

**FactoryModel.jsx** - Interactive visualization of the AI Talent Factory process

**TalentPipeline.jsx** - Data visualization component for talent progression

### Styling System

**Global CSS** (`index.css`):
- CSS custom properties (variables) for theming
- Semantic color palette (dark, secondary, accent, yellow)
- Tailwind integration with legacy layer cascade
- Responsive design patterns

**Color Palette:**
```
--dark: #0F2B22 (primary dark green)
--dark-soft: #132F26
--secondary: #155F4B (secondary green)
--accent: #5AB94B (lime green)
--yellow: #F6DB2D (highlight yellow)
--white: #fff
--paper: #f3f7f2 (light background)
```

**Responsive Breakpoints:**
- Mobile: max-width 500px
- Tablet: max-width 820px
- Desktop: max-width 1120px

### Asset Management

Assets are centrally registered in `manifest.js`:
```javascript
export const assets = {
  'hero-handshake-main-v3': '/src/assets/hero-handshake-main-v3.webp',
  'intro-poster': '/public/assets/intro-poster.jpg',
  // ...all images and videos
}
```

**Image Optimization:**
- All images use WebP format for better compression
- Responsive image sizing with max-width constraints
- Hero images include detail variants (v3 versions are current)

**Video Assets:**
- `empowered-intro.mp4` - Desktop intro video
- `empowered-intro-mobile.mp4` - Mobile optimized intro
- `empowered-intro.webm` - WebM fallback format

## Backend Architecture

### API Endpoints

**GET /api/health**
- Health check endpoint
- Returns: `{ ok: true, time: ISO_TIMESTAMP }`

**POST /api/contact**
- Contact form submission endpoint
- Validates: name, email, interest, message
- Saves submission to `submissions.json`
- Attempts SMTP email notification
- Returns: `{ ok: true, id: UUID, emailSent: boolean }`

**GET /api/contact/submissions**
- Admin endpoint to retrieve all submissions
- Requires: `x-admin-token` header matching `ADMIN_TOKEN` env var
- Returns: Array of all saved submissions

### Email Service (Nodemailer)

**Configuration** (`email.js`):
```javascript
const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT || 587,
  secure: SMTP_PORT === 465,
  auth: { user: SMTP_USER, pass: SMTP_PASS }
})
```

**SMTP Environment Variables:**
- `SMTP_HOST` - SMTP server (e.g., smtp.gmail.com)
- `SMTP_PORT` - 587 (TLS) or 465 (SSL)
- `SMTP_USER` - Email account
- `SMTP_PASS` - App password or SMTP credential
- `CONTACT_NOTIFY_TO` - Recipient email (defaults to SMTP_USER)

**Graceful Degradation:**
- If SMTP not configured, submissions still saved locally
- Email sending failures don't block the submission response
- Logs indicate email status for debugging

### Data Persistence

**Storage** (`storage.js`):
- Submissions saved to `backend/data/submissions.json`
- Unique ID generation for each submission
- Timestamp recording
- File-based persistence (no database dependency)

## Design Patterns

### 1. Intro Animation
- Single-play overlay animation on first page load
- Shattering glass effect with embedded video
- Fallback to CSS canvas animation if video fails
- Dismissible overlay

### 2. Responsive Grid Layout
- Sections use `max(6vw, calc((100% - 1300px) / 2))` for padding
- Maintains consistent horizontal spacing across breakpoints
- Adapts to smaller viewports

### 3. Asset Lazy Loading
- Images loaded on demand
- WebP format with fallbacks
- Optimized for web delivery

### 4. Form Validation
- Client-side validation (frontend)
- Server-side validation (backend) for security
- Clear error messaging to users

## CSS Features

### Layout Utilities
- Flexbox for navigation and CTAs
- CSS Grid for multi-column sections
- Sticky header for navigation
- Overflow hidden to prevent horizontal scrolling

### Visual Effects
- Gradient overlays on hero sections
- Glow effects (blur filters)
- Wave SVG separators between sections
- Hover state transforms on buttons

### Accessibility
- Focus-visible outlines on interactive elements
- Semantic HTML structure
- Alt text on all images
- Color contrast maintained

## Development Workflow

### Local Development

**Frontend:**
```bash
cd zip/frontend
npm install
npm run dev  # Starts Vite on http://localhost:5173
```

**Backend:**
```bash
cd zip/backend
npm install
cp .env.example .env  # Configure SMTP here
npm run dev  # Starts Express on http://localhost:4000
```

### Build & Deployment

**Frontend Production Build:**
```bash
npm run build  # Creates dist/ folder
npm run preview  # Preview production build locally
```

**Environment Variables:**
- Frontend: Vite config in `vite.config.js`
- Backend: `.env` file (never commit credentials)

## Performance Considerations

1. **Code Splitting** - React Router handles page-level code splitting
2. **Image Optimization** - WebP format reduces payload size
3. **Video Optimization** - Multiple formats (mp4, webm, mobile)
4. **CSS-in-JS** - Tailwind generates only used styles
5. **Lazy Loading** - Components load on route navigation

## Security

1. **CORS** - Backend enables CORS for frontend requests
2. **Email Credentials** - Stored in `.env`, never in code
3. **Admin Token** - Simple token-based auth for submissions endpoint
4. **Input Validation** - Both client and server-side
5. **Rate Limiting** - Not currently implemented (recommended for production)

## Deployment

### Hosting Requirements

**Frontend:**
- Static hosting (Vercel, Netlify, S3 + CloudFront, etc.)
- Can be deployed as SPA with index.html routing

**Backend:**
- Node.js hosting (Heroku, AWS Lambda, DigitalOcean, etc.)
- Requires environment variables for SMTP
- Port exposure (default 4000)

### Environment Setup

Create `.env` in backend root:
```
PORT=4000
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
CONTACT_NOTIFY_TO=admin@empowered.com
ADMIN_TOKEN=secure-random-token
```

## Future Considerations

1. **Database** - Replace JSON file storage with PostgreSQL/MongoDB
2. **Authentication** - Add user accounts and admin dashboard
3. **Analytics** - Track submissions and user behavior
4. **SEO** - Implement meta tags, sitemaps, structured data
5. **Internationalization** - Multi-language support
6. **CDN** - Global content delivery for assets
7. **Rate Limiting** - Protect APIs from abuse
8. **Logging** - Centralized error and access logging

## Version History

- **v1.0.0** - Initial release
  - React + Vite frontend
  - Express backend with SMTP
  - Contact form with email notifications
  - Responsive design system
  - Hero intro animation
