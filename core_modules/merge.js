const fs = require('fs');

const data1 = JSON.parse(fs.readFileSync('student.json', 'utf8'));
const data2 = JSON.parse(fs.readFileSync('product.json', 'utf8'));

const mergedData = { ...data1, ...data2 };

fs.writeFileSync('merge.json', JSON.stringify(mergedData, null, 4),(err)=>{
    if(err){
        console.error("error while writing file:", err);
        return;
    }
    console.log("merge.json file written successfully");
});