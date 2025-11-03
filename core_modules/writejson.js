const student ={
    name: "Vivek",
    age: 20,
    class: "INT222"
};
const fs = require('fs');

fs.writeFile('data.json', JSON.stringify(student, null, 4), (err) => {
    if (err) {
        console.error('Error writing file:', err);
        return;
    }
    console.log('File has been written successfully.');
});