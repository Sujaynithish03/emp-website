# EmpowerED Careers

The website is a React 19, Vite 8, React Router v7, and Tailwind v4 application.

## Project layout

```text
frontend/   React + Vite website, contact form, and production build
```

## Run the website locally

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

The Vite development server runs at `http://localhost:5173`. Contact submissions go directly to the configured Google Apps Script Web App.

## Contact submissions

The home page and Contact page share the same controlled form. It sends the fields `name`, `email`, `interest`, and `message` as JSON to the Google Apps Script Web App configured by `VITE_GOOGLE_SCRIPT_URL`.

The form uses `mode: 'no-cors'`, so browsers do not expose the Apps Script response or HTTP error status. The UI can report network failures, but a successful browser request cannot independently confirm that Apps Script wrote the row to Google Sheets.

Set `VITE_GOOGLE_SCRIPT_URL` in the frontend environment before running the development server or building for production. Vite embeds these values in the public client bundle, so use only the public Web App URL there, never credentials or private keys.

## Production build

```bash
cd frontend
npm run build
npm run preview
```

The build writes prerendered public pages, JavaScript, CSS, and assets to `frontend/dist/`. Deploy that directory on the website host and configure the host to serve each prerendered route correctly. The website has no application backend.

## Website features

- Seven public pages routed in `frontend/src/App.jsx`.
- Shared header, navigation, mobile menu, footer, and route layout in `frontend/src/components/Layout.jsx`.
- Responsive contact form reused on the home page and Contact route.
- Page-specific SEO metadata and Organization structured data.
- Sitemap generation and `robots.txt` for public routes.
- Consent-gated Google Analytics / Google Tag Manager integration.
- Images are imported from `frontend/src/assets/` through the manifest files.
- The `/terms`, `/privacy`, and `/cookies` pages are placeholders pending finalized legal content.
