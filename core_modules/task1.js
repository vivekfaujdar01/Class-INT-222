const fs = require('fs');

fs.readFile('student.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }
    try {
        const jsonData = JSON.parse(data);
        console.log('File content as JSON:', jsonData);
        jsonData.map(student => {
            console.log('Name: ', student.name);
            console.log('Marks: ', student.marks);
            console.log('Subject: ', student.subject);
            student.marks += 5; // Adding 5 marks as bonus
        });
        console.log('Updated Student Data:', jsonData);

        // Write the updated JSON back to the file
        fs.writeFile('student.json', JSON.stringify(jsonData, null, 4), (err) => {
            if (err) {
                console.error('Error writing file:', err);
                return;
            }
            console.log('Student data has been updated successfully.');
        });
    } catch (parseErr) {
        console.error('Error parsing JSON:', parseErr);
    }
});