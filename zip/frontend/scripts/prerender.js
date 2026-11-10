import { createServer, loadEnv } from 'vite';
import React from 'react';
import { StaticRouter } from 'react-router';
import { renderToPipeableStream } from 'react-dom/server';
import { Writable } from 'node:stream';
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const frontendRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outputRoot = resolve(frontendRoot, 'dist');
const env = loadEnv('production', frontendRoot, 'VITE_');
for (const [key, value] of Object.entries(env)) process.env[key] ??= value;

const vite = await createServer({
  configFile: resolve(frontendRoot, 'vite.config.js'),
  root: frontendRoot,
  appType: 'custom',
  server: { middlewareMode: true },
  logLevel: 'error',
});

const escapeHtml = (value) => String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

function setMeta(html, attribute, key, content) {
  const tag = `<meta ${attribute}="${escapeHtml(key)}" content="${escapeHtml(content)}" />`;
  const pattern = new RegExp(`<meta\\s+${attribute}="${escapeRegExp(key)}"\\s+content="[^"]*"\\s*\\/?\\s*>`, 'i');
  if (pattern.test(html)) return html.replace(pattern, tag);
  return html.replace('</head>', `    ${tag}\n  </head>`);
}

function setCanonical(html, href) {
  const tag = `<link rel="canonical" href="${escapeHtml(href)}" />`;
  const pattern = /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?\s*>/i;
  return pattern.test(html) ? html.replace(pattern, tag) : html.replace('</head>', `    ${tag}\n  </head>`);
}

function setOrganizationSchema(html, schema) {
  const safeJson = JSON.stringify(schema).replaceAll('<', '\\u003c');
  const tag = `<script id="organization-jsonld" type="application/ld+json">${safeJson}</script>`;
  const pattern = /<script\s+id="organization-jsonld"\s+type="application\/ld\+json">[\s\S]*?<\/script>/i;
  return pattern.test(html) ? html.replace(pattern, tag) : html.replace('</head>', `    ${tag}\n  </head>`);
}

function renderRoute(App, path) {
  return new Promise((resolveHtml, rejectHtml) => {
    const chunks = [];
    let stream;
    const output = new Writable({
      write(chunk, _encoding, callback) { chunks.push(chunk); callback(); },
    });
    output.on('error', rejectHtml);
    output.on('finish', () => resolveHtml(Buffer.concat(chunks).toString('utf8')));
    stream = renderToPipeableStream(
      React.createElement(StaticRouter, { location: path }, React.createElement(App)),
      {
        onAllReady() { stream.pipe(output); },
        onShellError: rejectHtml,
        onError(error) { console.error(`[prerender] ${path}:`, error); },
      },
    );
  });
}

try {
  const [{ default: App }, seo] = await Promise.all([
    vite.ssrLoadModule('/src/App.jsx'),
    vite.ssrLoadModule('/src/utils/seoConfig.js'),
  ]);
  const manifest = JSON.parse(await readFile(resolve(outputRoot, '.vite/manifest.json'), 'utf8'));
  const assetPaths = new Map(Object.entries(manifest).map(([source, entry]) => [source.replaceAll('\\', '/'), `/${entry.file}`]));
  const template = await readFile(resolve(outputRoot, 'index.html'), 'utf8');
  const rootPattern = /<div id="root"[^>]*><\/div>/;

  for (const route of seo.PUBLIC_SEO_ROUTES) {
    const page = seo.getSeoMetadata(route.path);
    const schema = seo.getOrganizationStructuredData(page.image || undefined);
    let html = template
      .replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(page.title)}</title>`)
      .replace(rootPattern, '<div id="root" data-prerendered="true"></div>');

    html = setMeta(html, 'name', 'description', page.description);
    html = setMeta(html, 'name', 'robots', page.robots);
    html = setMeta(html, 'property', 'og:type', 'website');
    html = setMeta(html, 'property', 'og:site_name', 'EmpowerED Careers');
    html = setMeta(html, 'property', 'og:title', page.title);
    html = setMeta(html, 'property', 'og:description', page.description);
    html = setMeta(html, 'property', 'og:url', page.canonical);
    if (page.image) html = setMeta(html, 'property', 'og:image', page.image);
    html = setMeta(html, 'name', 'twitter:card', page.image ? 'summary_large_image' : 'summary');
    html = setMeta(html, 'name', 'twitter:title', page.title);
    html = setMeta(html, 'name', 'twitter:description', page.description);
    if (page.image) html = setMeta(html, 'name', 'twitter:image', page.image);
    html = setCanonical(html, page.canonical);

    const verificationToken = env.VITE_GOOGLE_SITE_VERIFICATION || process.env.VITE_GOOGLE_SITE_VERIFICATION;
    if (verificationToken) html = setMeta(html, 'name', 'google-site-verification', verificationToken);
    else html = html.replace(/\s*<meta\s+name="google-site-verification"[^>]*>/i, '');
    html = setOrganizationSchema(html, schema);

    let body = await renderRoute(App, route.path);
    body = body.replace(/\bsrc="(\/?(?:src\/assets|@fs\/)[^"]+)"/g, (tag, url) => {
      const normalized = decodeURIComponent(url).replace(/^\/+/, '').replace(/^@fs\//, '');
      const built = assetPaths.get(normalized) || assetPaths.get(normalized.replace(/^src\//, ''));
      return built ? `src="${built}"` : tag;
    });
    html = html.replace('<div id="root" data-prerendered="true"></div>', `<div id="root" data-prerendered="true">${body}</div>`);

    const destination = route.path === '/' ? resolve(outputRoot, 'index.html') : resolve(outputRoot, route.path.slice(1), 'index.html');
    await mkdir(dirname(destination), { recursive: true });
    await writeFile(destination, html, 'utf8');
    console.log(`[prerender] ${route.path}`);
  }
} finally {
  await Promise.all([
    vite.close(),
    rm(resolve(outputRoot, '.vite'), { recursive: true, force: true }),
  ]);
}
