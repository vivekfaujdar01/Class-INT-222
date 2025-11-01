const fs = require('fs');

// Create a readable stream
const readStream = fs.createReadStream('input.txt', 'utf8');

// Handle events
readStream.on('data', (chunk) => {
  console.log('New chunk received:');
  console.log(chunk);
});

readStream.on('end', () => {
  console.log('Finished reading file.');
});

readStream.on('error', (err) => {
  console.error('Error:', err);
});

// Stream events

// data - when data chunk is available
// end - when there is no more data to read
// error - when there is an error while reading or writing
// finish - when all data has been flushed to the underlying system or writing completed

// Writing Data using Stream
// Example of a Writable Stream:

// Create a writable stream
const writeStream = fs.createWriteStream('output.txt');

// Write data
writeStream.write('Hello, ');
writeStream.write('this is written using stream!\n');

// End the stream
writeStream.end('Goodbye!');

writeStream.on('finish', () => {
  console.log('All data written successfully!');
});

writeStream.on('error', (err) => {
  console.error('Error:', err);
});

// write() sends a chunk to the stream.
// end() signals that writing is done.
// finish event means the stream is closed.

// Piping Streams
// pipe() is one of the most powerful and elegant stream methods.
// It connects the output of one stream to the input of another.

// Read from one file and write to another
const readsStream = fs.createReadStream('input.txt');
const writesStream = fs.createWriteStream('output.txt');

readsStream.pipe(writesStream);

console.log('File copied successfully using stream!');

// What is Backpressure?
// Backpressure occurs when the writable stream can’t handle data as fast as the readable stream provides it.
// Example:
// If you’re downloading data quickly but writing to disk slowly, the memory can fill up.
// Streams handle this automatically by pausing/resuming the readable stream until the writable one catches up.
// That’s one big reason why pipe() is preferred — it handles backpressure efficiently.
