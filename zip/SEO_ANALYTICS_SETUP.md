# SEO and Google Analytics setup

## Current project and deployment assumptions

The site is a React single-page application built with Vite and React Router. Its production domain is inferred from the existing contact details (`empoweredcareers.ai`). No hosting-provider configuration is present in this repository. Set `VITE_SITE_URL` to the verified HTTPS origin if the production domain differs. The deployment host must serve the Vite `dist/` directory and rewrite unknown public paths to `index.html` so direct visits and refreshes on React routes work.

The site shows an opt-in analytics consent notice when a Measurement ID is configured. Visitors can decline or grant analytics storage there and reopen the preference using the footer Cookie settings control. Consent is stored in local storage on this device.

## Environment variables

Copy `.env.example` to `.env` for local development and set:

- `VITE_GA_MEASUREMENT_ID`: GA4 web stream ID (format `G-...`). Optional; Analytics stays disabled when empty.
- `VITE_GOOGLE_SITE_VERIFICATION`: the token supplied by Search Console's HTML tag method. Optional; its meta tag is emitted only when configured.
- `VITE_SITE_URL`: production HTTPS origin, with no trailing slash. Defaults in code to `https://empoweredcareers.ai`.
- `VITE_ORGANIZATION_NAME`: official organization name used in structured data; defaults to EmpowerED Careers by Teceze.

Vite embeds `VITE_` values in public client code. Never place passwords or private API keys in them. `.env` is ignored by Git; configure production values in the hosting provider's environment settings and rebuild after changes.

## Google Analytics 4

1. Create an Analytics account/property in [Google Analytics](https://analytics.google.com/).
2. In the property, create a Web data stream for the production HTTPS site and copy its Measurement ID (`G-...`). See [Set up Analytics for a website](https://support.google.com/analytics/answer/9304153).
3. Set `VITE_GA_MEASUREMENT_ID` in the local or production environment. Rebuild and deploy.
4. The built-in consent notice calls `setAnalyticsConsent(true)` after an explicit allow and `setAnalyticsConsent(false)` on decline or withdrawal. Consent is stored in local storage on this device. Do not grant consent by default. If you replace the notice with a CMP, connect its accept and withdrawal actions to these functions. The app sends only page views, CTA clicks, and successful contact-form lead events; it does not send form values or contact details.
5. Visit the production site after granting consent and use Realtime in Google Analytics to check activity. A deployed ID alone does not prove that Analytics is receiving data.

## Google Search Console

1. Add the production site as a property in [Google Search Console](https://search.google.com/search-console/).
2. Domain-property verification via DNS is recommended because it covers protocols and subdomains. Add the TXT record Search Console provides at the domain's DNS host, then click Verify after DNS has propagated. See [Verify site ownership](https://support.google.com/webmasters/answer/9008080).
3. Alternatively choose the URL-prefix HTML-tag method, place the supplied token in `VITE_GOOGLE_SITE_VERIFICATION`, rebuild, deploy, and use Search Console's Verify action. The application only renders the meta tag; it does not complete verification.
4. After verification, submit `https://empoweredcareers.ai/sitemap.xml` under Sitemaps. Inspect individual URLs with URL Inspection to request indexing and review crawl/index status. See [Sitemaps report](https://support.google.com/webmasters/answer/7451001) and [URL Inspection](https://support.google.com/webmasters/answer/9012289).

## Sitemap, robots, structured data, and page metadata

`public/sitemap.xml` is generated before each production build from the public route list in `src/utils/seoConfig.js`. It contains the home, Programs, AI for Everyone, Solutions, Career Paths, About, and Contact pages. Placeholder legal pages and the not-found route are not included. `public/robots.txt` allows public crawling and points to the production sitemap. Placeholder legal pages carry a `noindex` directive and are excluded from the sitemap.

The SEO controller updates each route's title, description, canonical URL, robots directive, Open Graph, and Twitter metadata during client navigation. One Organization JSON-LD script is maintained, using organization details already present on the site. Social profile links are omitted because none are configured in the project.

Test JSON-LD with [Google's Rich Results Test](https://search.google.com/test/rich-results) and [Schema.org Validator](https://validator.schema.org/). Check titles, descriptions, canonicals, and index directives in the rendered HTML with browser developer tools or a crawler. Because this remains a client-rendered SPA, crawlers that do not execute JavaScript initially receive the shared HTML shell; prerendering/server rendering could improve first-response metadata and content discoverability. No migration or prerender plugin has been added because the hosting configuration is unknown and the existing site has not been evaluated for prerender compatibility.

## Deploy and verify

1. Set the environment variables in the deployment platform and build from `zip/frontend` with `npm run build`.
2. Publish the generated `dist/` directory. Configure SPA rewrites to `index.html` for the site's React routes, while serving static files such as `/robots.txt` and `/sitemap.xml` directly.
3. Confirm HTTPS is enabled and that the canonical origin matches the deployed domain.
4. Confirm `https://empoweredcareers.ai/sitemap.xml` and `/robots.txt` return the generated files. Check each public route directly and after refresh.
5. Check mobile pages and performance using [PageSpeed Insights](https://pagespeed.web.dev/) and Search Console's Core Web Vitals report. The project does not contain hosting/CDN settings, so HTTPS, caching, redirects, and server fallback must be confirmed at the host.
6. Use [Google Search Console indexing guidance](https://developers.google.com/search/docs/fundamentals/seo-starter-guide) to review indexed pages. Neither deployment nor sitemap submission guarantees indexing.
