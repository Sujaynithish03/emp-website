import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadEnv } from 'vite';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const env = loadEnv('production', root, 'VITE_');
for (const [key, value] of Object.entries(env)) process.env[key] ??= value;
const { PUBLIC_SEO_ROUTES, SITE_URL } = await import('../src/utils/seoConfig.js');
const indexPath = resolve(root, 'index.html');
const indexHtml = await (await import('node:fs/promises')).readFile(indexPath, 'utf8');
const originPattern = /https?:\/\/[^"'\s<>]+/g;
const normalizedIndexHtml = indexHtml.replace(originPattern, (url) => {
  try {
    const parsed = new URL(url);
    if (parsed.hostname === 'empoweredcareers.ai' || parsed.hostname.endsWith('.empoweredcareers.ai')) {
      return `${SITE_URL}${parsed.pathname}${parsed.search}${parsed.hash}`;
    }
  } catch {}
  return url;
});
await writeFile(indexPath, normalizedIndexHtml, 'utf8');
const urls = PUBLIC_SEO_ROUTES.map(({ path }) => `  <url>\n    <loc>${SITE_URL}${path}</loc>\n  </url>`).join('\n');
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
await mkdir(resolve(root, 'public'), { recursive: true });
await writeFile(resolve(root, 'public/sitemap.xml'), xml, 'utf8');
const robots = `User-agent: *\nAllow: /\nSitemap: ${SITE_URL}/sitemap.xml\n`;
await writeFile(resolve(root, 'public/robots.txt'), robots, 'utf8');
