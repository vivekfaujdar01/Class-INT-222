const fs = require('fs');

// this code is for reading text from a file

fs.readFile('example.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }
    console.log('File contents:', data);
});

// this code is for writing text to a file

fs.writeFile('file1.txt', 'Text from fs.js!', (err) => {
    if (err) {
        console.error('Error writing file:', err);
        return;
    }
    console.log('File written successfully');
});

// this code is for appending text to a file

fs.appendFile('file1.txt', '\nAppended text from fs.js!', (err) => {
    if(err){
        console.error('Error appending to file:', err);
        return;
    }
    console.log('File appended successfully');
});

// this code is for deleteing a file

fs.unlink('temp.txt', (err) => {
    if (err) {
        console.error('Error deleting file:', err);
        return;
    }
    console.log('File deleted successfully');
});

// this code is for renaming a file

fs.rename('file1.txt', 'newname.txt', (err) => {
    if (err) {
        console.error('Error renaming file:', err);
        return;
    }
    console.log('File renamed successfully');
});

// this code is for checking if a file exists

if (fs.existsSync('file2.txt')) {
    console.log('file2.txt exists');
}
else {
    console.log('file2.txt does not exist');
}