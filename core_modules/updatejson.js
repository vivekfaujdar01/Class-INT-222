const fs = require('fs');

fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }
    
    try {
        console.log("file is readable");      
        const jsonData = JSON.parse(data);
        console.log('File content as JSON:', jsonData);

        // Update the age property
        jsonData.age = 21;

        // Write the updated JSON back to the file
        fs.writeFile('data.json', JSON.stringify(jsonData, null, 4), (err) => {
            if (err) {
                console.error('Error writing file:', err);
                return;
            }
            console.log('File has been updated successfully.');
        });
    } catch (parseErr) {
        console.error('Error parsing JSON:', parseErr);
    }
});

