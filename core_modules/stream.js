const fs = require('fs');
const stream = require('stream');

// this code is for creating a readable stream from a file

const readableStream = fs.createReadStream('file1.txt');
readableStream.on('data', (chunk) => {
    console.log('Read chunk:', chunk.toString());
});
readableStream.on('end', () => {
    console.log('Finished reading file');
});

// Stream events

// data - when data chunk is available
// end - when there is no more data to read
// error - when there is an error while reading or writing
// finish - when all data has been flushed to the underlying system or writing completed