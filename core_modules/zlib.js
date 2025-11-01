// Stream: compress file to .gz (recommended for big files)
const fs = require('fs');
const zlib = require('zlib');

const source = fs.createReadStream('large.log');
const dest = fs.createWriteStream('large.log.gz');

source.pipe(zlib.createGzip()).pipe(dest)
  .on('finish', () => console.log('Compressed to large.log.gz'));
// This uses streaming + pipe() so Node handles backpressure and memory efficiently. 


// Example 2 — Stream decompress .gz

const fs = require('fs');
const zlib = require('zlib');

fs.createReadStream('large.log.gz')
  .pipe(zlib.createGunzip())
  .pipe(fs.createWriteStream('large.log'))
  .on('finish', () => console.log('Decompressed'));
// This decompresses large.log.gz back to large.log using streams.

