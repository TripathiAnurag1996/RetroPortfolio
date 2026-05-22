import fs from 'fs';
import sharp from 'sharp';

const dir = 'public/wallpapers';
fs.readdirSync(dir).forEach(file => {
  if (file.endsWith('.png')) {
    const path = dir + '/' + file;
    const stats = fs.statSync(path);
    if (stats.size > 300 * 1024) {
      sharp(path)
        .webp()
        .toFile(path.replace('.png', '.webp'))
        .then(() => console.log('Converted: ' + file))
        .catch(err => console.error(err));
    }
  }
});
