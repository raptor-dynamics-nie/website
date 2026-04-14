const Jimp = require('jimp');

Jimp.read('./public/raptor-logo.png').then(img => {
  // Autocrop removes transparent boundaries, maximizing the logo's visual size
  img.autocrop(0.0001, false);

  img.scan(0, 0, img.bitmap.width, img.bitmap.height, function(x, y, idx) {
    const alpha = this.bitmap.data[idx + 3];
    if (alpha > 0) {
      this.bitmap.data[idx + 0] = 255;
      this.bitmap.data[idx + 1] = 255;
      this.bitmap.data[idx + 2] = 255;
    }
  });

  img.write('./public/white-logo.png', () => {
    console.log('Logo successfully cropped and inverted to white!');
  });
}).catch(err => {
  console.error("Error processing logo:", err);
});
