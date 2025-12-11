const express = require('express');

const app = express();

// app.get('/', (req, res)=>{
//     res.send('Server is running at url http://localhost:3000/\n');
// })

// app.listen(3000, () => {
//     console.log('Server is running at http://localhost:3000/');
// });

app.get('/',(req, res)=>{
    res.status(200).send('Server is running at url http://localhost:3000/\n');
})

app.get('/about',(req, res)=>{
    res.status(200).json({
        page: "About Page",
        description: "This is the about page at url http://localhost:3000/about."
    });
})

app.use((req, res)=>{
    res.status(404).send('404 Not Found\n');
})

app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000/');
});