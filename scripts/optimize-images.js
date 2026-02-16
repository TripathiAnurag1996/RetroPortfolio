import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, '../public');
const targetImages = [
  'profile.jpg',
  'WELCOME_IMAGE.jpg',
  'WELCOME_RETRO.jpg',
  'WELCOME_RETRO.png'
];

async function optimizeImages() {
  console.log('Starting image optimization...');
  
  for (const imgName of targetImages) {
    const inputPath = path.join(publicDir, imgName);
    
    if (fs.existsSync(inputPath)) {
      const ext = path.extname(imgName);
      const baseName = path.basename(imgName, ext);
      const outputPathWebp = path.join(publicDir, `${baseName}.webp`);
      const outputPathOptimized = path.join(publicDir, `${baseName}-optimized${ext}`);

      try {
        // Convert to WebP
        await sharp(inputPath)
          .webp({ quality: 80 })
          .toFile(outputPathWebp);
        console.log(`Optimized: ${imgName} -> ${baseName}.webp`);

        // Also create a compressed JPEG/PNG as fallback
        await sharp(inputPath)
          .jpeg({ quality: 75, progressive: true })
          .toFile(outputPathOptimized);
        console.log(`Optimized: ${imgName} -> ${baseName}-optimized${ext}`);
        
        // Replace original with optimized version if size is better
        const originalSize = fs.statSync(inputPath).size;
        const optimizedSize = fs.statSync(outputPathOptimized).size;
        
        if (optimizedSize < originalSize) {
          fs.renameSync(outputPathOptimized, inputPath);
          console.log(`Replaced original ${imgName} with optimized version (${Math.round((originalSize - optimizedSize) / 1024)} KB saved)`);
        } else {
          fs.unlinkSync(outputPathOptimized);
          console.log(`Original ${imgName} is already smaller than optimized version. Keeping original.`);
        }

      } catch (err) {
        console.error(`Error optimizing ${imgName}:`, err.message);
      }
    } else {
      console.warn(`Warning: Image ${imgName} not found in public directory.`);
    }
  }
  
  console.log('Image optimization complete!');
}

optimizeImages().catch(err => {
  console.error('Critical error in image optimization:', err);
  process.exit(1);
});
