const fs = require('fs');

// Asynchronous read
fs.readFile('file1.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  } else {
    fs.readFile('file2.txt', 'utf8', (err, data2) => {
      if (err) {
        console.error('Error reading file2:', err);
        return;
      } else {
        fs.readFile('file3.txt', 'utf8', (err, data3) => {
          if (err) {
            console.error('Error reading file3:', err);
            return;
          } else {
            console.log('File1 content:', data);
            console.log('File2 content:', data2);
            console.log('File3 content:', data3);
          }
        });
      }
    });
  }
});