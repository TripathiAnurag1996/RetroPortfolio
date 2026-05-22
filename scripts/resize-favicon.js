import sharp from 'sharp';

async function resize() {
  try {
    await sharp('public/favicon.png')
      .resize(32, 32)
      .png({ quality: 90 })
      .toFile('public/favicon_new.png');
    console.log('Favicon resized successfully!');
  } catch (error) {
    console.error('Error resizing favicon:', error);
  }
}

resize();
