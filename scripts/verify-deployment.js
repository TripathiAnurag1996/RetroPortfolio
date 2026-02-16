import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, '../public');
const distDir = path.join(__dirname, '../dist');

const checkFile = (dir, fileName) => {
  const filePath = path.join(dir, fileName);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${fileName} exists in ${path.basename(dir)}`);
    return true;
  } else {
    console.error(`❌ ${fileName} MISSING from ${path.basename(dir)}`);
    return false;
  }
};

const verify = () => {
  console.log('--- Deployment Verification Report ---');
  let success = true;

  // Check public assets
  success &= checkFile(publicDir, 'sitemap.xml');
  success &= checkFile(publicDir, 'robots.txt');
  success &= checkFile(publicDir, '_headers');
  success &= checkFile(publicDir, '_redirects');

  // Check if WebP images were generated
  const images = ['profile.webp', 'WELCOME_RETRO.webp'];
  images.forEach(img => {
    success &= checkFile(publicDir, img);
  });

  // Check build output if exists
  if (fs.existsSync(distDir)) {
    console.log('\n--- Build Output (dist) Check ---');
    ['index.html', 'sitemap.xml', 'robots.txt', '_headers', '_redirects', '809d84c6888448938167f1dc2167d4d4.txt'].forEach(file => {
      success &= checkFile(distDir, file);
    });

    // Verify SPA placeholders in index.html
    const indexHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');
    const structuralChecks = [
      { name: 'Root Div', pattern: /id="root"/ },
      { name: 'Vite Script', pattern: /script type="module" src="\/assets\/index-[^"]+\.js"/ }
    ];

    console.log('\n--- SPA Structure Validation ---');
    structuralChecks.forEach(check => {
      if (check.pattern.test(indexHtml)) {
        console.log(`✅ ${check.name} found`);
      } else {
        console.error(`❌ ${check.name} NOT found in dist/index.html`);
        success = false;
      }
    });

    console.log('\nℹ️ Note: SEO meta tags are dynamic (SPA) and verified via Lighthouse/Runtime checks.');
  } else {
    console.warn('\n⚠️ dist directory not found. Run "npm run build" first.');
  }

  if (success) {
    console.log('\n🎉 All checks passed! Ready for deployment.');
  } else {
    console.log('\n❌ Verification failed. Please fix issues above.');
    process.exit(1);
  }
};

verify();
