const fs = require('fs');

const productData = [
    { "id": 1, "name": "Laptop", "price": 80000 },
    { "id": 2, "name": "Smartphone", "price": 50000 },
    { "id": 3, "name": "Tablet", "price": 30000 }  
]
fs.writeFile('product.json', JSON.stringify(productData, null, 4), (err) => {
    if (err) {
        console.error('Error writing file:', err);
        return;
    }
    console.log('Product file has been written successfully.');
});