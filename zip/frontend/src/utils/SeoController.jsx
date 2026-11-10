import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getOrganizationStructuredData, getSeoMetadata } from './seoConfig';

function setMeta(attribute, key, content) {
  let node = document.head.querySelector(`meta[${attribute}="${key}"]`);
  if (!node) { node = document.createElement('meta'); node.setAttribute(attribute, key); document.head.appendChild(node); }
  node.setAttribute('content', content);
}

function setLink(rel, href) {
  let node = document.head.querySelector(`link[rel="${rel}"]`);
  if (!node) { node = document.createElement('link'); node.rel = rel; document.head.appendChild(node); }
  node.href = href;
}

export default function SeoController() {
  const { pathname } = useLocation();
  useEffect(() => {
    const { title, description, canonical, robots, image } = getSeoMetadata(pathname);
    document.title = title;
    setMeta('name', 'description', description);
    setMeta('name', 'robots', robots);
    setLink('canonical', canonical);
    setMeta('property', 'og:type', 'website');
    setMeta('property', 'og:site_name', 'EmpowerED Careers');
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', canonical);
    if (image) setMeta('property', 'og:image', image);
    setMeta('name', 'twitter:card', image ? 'summary_large_image' : 'summary');
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    if (image) setMeta('name', 'twitter:image', image);

    let verification = document.head.querySelector('meta[name="google-site-verification"]');
    const token = import.meta.env.VITE_GOOGLE_SITE_VERIFICATION;
    if (token) {
      if (!verification) { verification = document.createElement('meta'); verification.name = 'google-site-verification'; document.head.appendChild(verification); }
      verification.content = token;
    } else verification?.remove();

    const schemaId = 'organization-jsonld';
    let schema = document.getElementById(schemaId);
    if (!schema) { schema = document.createElement('script'); schema.id = schemaId; schema.type = 'application/ld+json'; document.head.appendChild(schema); }
    schema.textContent = JSON.stringify(getOrganizationStructuredData(image || undefined));
    return () => {};
  }, [pathname]);
  return null;
}
