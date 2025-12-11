// Tasks
// create a server that uses the get method and display welcome message
// show the user information by using get method (name,age)
// create html form with input by using post method
// add two members use the post method
// create a page using get and post method
// create an express app that take username and age
// create an express app that accepts a post request
// create a get route /product that accepts the product details via query parameters

const express = require('express');

const app = express();

app.get('/',(req, res)=>{
    res.send("Welcome Mam");
})

app.get('/info',(req, res)=>{
    res.status(200).json({
        "name" : "Vivek",
        "age" : "20"
    })
})

app.listen(3000,()=>{
    console.log("Server is running");
})

