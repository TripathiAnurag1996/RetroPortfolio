import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_URL = process.env.VITE_SITE_URL || 'https://anuragtripathi.pro';

const windows = [
  { id: 'about', priority: 0.8, changefreq: 'monthly' },
  { id: 'settings', priority: 0.5, changefreq: 'yearly' },
  { id: 'my-computer', priority: 0.7, changefreq: 'monthly' },
  { id: 'documents', priority: 0.6, changefreq: 'monthly' },
  { id: 'music', priority: 0.5, changefreq: 'monthly' },
  { id: 'guestbook', priority: 0.7, changefreq: 'weekly' },
  { id: 'paint', priority: 0.4, changefreq: 'yearly' },
  { id: 'welcome', priority: 0.6, changefreq: 'monthly' },
  { id: 'snakegame', priority: 0.4, changefreq: 'monthly' },
  { id: 'help', priority: 0.5, changefreq: 'yearly' },
  { id: 'assistant', priority: 0.6, changefreq: 'monthly' },
  { id: 'demo', priority: 0.9, changefreq: 'weekly' },
  { id: 'browser', priority: 0.5, changefreq: 'monthly' }
];

const generateSitemap = () => {
  const lastmod = new Date().toISOString().split('T')[0];
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  
  // Homepage
  xml += `  <url>\n`;
  xml += `    <loc>${SITE_URL}/</loc>\n`;
  xml += `    <lastmod>${lastmod}</lastmod>\n`;
  xml += `    <changefreq>weekly</changefreq>\n`;
  xml += `    <priority>1.0</priority>\n`;
  xml += `  </url>\n`;
  
  // Window "routes" (for crawling clarity, though it's one page)
  windows.forEach(win => {
    xml += `  <url>\n`;
    xml += `    <loc>${SITE_URL}/?win=${win.id}</loc>\n`;
    xml += `    <lastmod>${lastmod}</lastmod>\n`;
    xml += `    <changefreq>${win.changefreq}</changefreq>\n`;
    xml += `    <priority>${win.priority}</priority>\n`;
    xml += `  </url>\n`;
  });
  
  xml += `</urlset>`;
  
  const publicDir = path.join(__dirname, '../public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), xml);
  console.log('Sitemap generated successfully!');
};

generateSitemap();
