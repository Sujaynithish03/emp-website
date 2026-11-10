const configuredSiteUrl = import.meta.env?.VITE_SITE_URL || (typeof process !== 'undefined' ? process.env?.VITE_SITE_URL : undefined);
export const SITE_URL = (configuredSiteUrl || 'https://empoweredcareers.ai').replace(/\/$/, '');

export const PUBLIC_SEO_ROUTES = [
  { path: '/', title: 'EmpowerED Careers | AI Talent Factory', description: 'EmpowerED Careers by Teceze transforms talent into an enterprise-ready Human + AI workforce through industry-led learning, hands-on projects, and career pathways.', image: '/assets/logo-full.png' },
  { path: '/programs', title: 'Career Programs | EmpowerED Careers', description: 'Explore Career Launch, Career Pro, and Career Accelerate programs for job readiness, role-based specialization, and industry experience.', image: '/assets/logo-full.png' },
  { path: '/ai-for-everyone', title: 'AI for Everyone | EmpowerED Careers', description: 'Build practical, profession-specific AI skills for productivity, decision-making, creativity, and career growth.', image: '/assets/logo-full.png' },
  { path: '/solutions', title: 'Talent Transformation Solutions | EmpowerED Careers', description: 'Explore talent transformation solutions for students, professionals, institutions, enterprises, startups, and the public sector.', image: '/assets/logo-full.png' },
  { path: '/career-paths', title: 'Technology Career Paths | EmpowerED Careers', description: 'Explore role-based technology career paths and progression across AI, data, cloud, cybersecurity, enterprise technology, and IoT.', image: '/assets/logo-full.png' },
  { path: '/about', title: 'About EmpowerED Careers | AI Era Workforce', description: 'Learn about EmpowerED Careers by Teceze and its industry-led approach to building an enterprise-ready Human + AI workforce.', image: '/assets/logo-full.png' },
  { path: '/contact', title: 'Contact EmpowerED Careers', description: 'Contact EmpowerED Careers to discuss career programs, campus partnerships, workforce development, and talent solutions.', image: '/assets/logo-full.png' },
];

export const NON_INDEXABLE_ROUTES = ['/terms', '/privacy', '/cookies'];

export function getSeoMetadata(pathname) {
  const normalizedPath = pathname === '/' ? '/' : pathname.replace(/\/+$/, '') || '/';
  const route = PUBLIC_SEO_ROUTES.find((item) => item.path === normalizedPath);
  const notFound = !route && !NON_INDEXABLE_ROUTES.includes(normalizedPath);
  return {
    route,
    title: route?.title || (notFound ? 'Page Not Found | EmpowerED Careers' : `${normalizedPath.slice(1).replaceAll('-', ' ')} | EmpowerED Careers`),
    description: route?.description || (notFound ? 'The requested page could not be found.' : 'Legal information for EmpowerED Careers.'),
    canonical: `${SITE_URL}${route?.path || normalizedPath}`,
    robots: route ? 'index, follow' : 'noindex, follow',
    image: route?.image ? `${SITE_URL}${route.image}` : null,
  };
}

export function getOrganizationStructuredData(imageUrl = `${SITE_URL}/assets/logo-full.png`) {
  const organizationName = import.meta.env?.VITE_ORGANIZATION_NAME ||
    (typeof process !== 'undefined' ? process.env?.VITE_ORGANIZATION_NAME : undefined) ||
    'EmpowerED Careers by Teceze';
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: organizationName,
    url: SITE_URL,
    logo: `${SITE_URL}/assets/logo-full.png`,
    image: imageUrl,
    description: 'A next-generation talent transformation company developing an enterprise-ready Human + AI workforce through an industry-led, outcome-driven ecosystem.',
    email: 'info@empoweredcareers.ai',
    telephone: '+91-75399 99500',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Sai Pride, 4th floor, SIDCO Industrial Estate, Guindy',
      addressLocality: 'Chennai',
      addressRegion: 'Tamil Nadu',
      postalCode: '600032',
      addressCountry: 'IN',
    },
  };
}
