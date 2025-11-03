const fs = require('fs');

fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }
    try {
        const jsonData = JSON.parse(data);
        console.log('File content as JSON:', jsonData);
        console.log('Name: ',jsonData.name);
        console.log('Age: ',jsonData.age);
        console.log('Class: ',jsonData.class);
    } catch (parseErr) {
        console.error('Error parsing JSON:', parseErr);
    }
});