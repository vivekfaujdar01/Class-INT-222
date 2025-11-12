const http = require('http');

//create a server

// const server = http.createServer((req, res)=>{
//     res.writeHead(200, {'Content-Type': 'text/plain'});
//     res.end('Hello World\n');
// })

// const server = http.createServer((req, res)=>{
//     if(req.url === '/'){
//         res.writeHead(200, {'Content-Type': 'text/plain'});
//         res.end('Server is running at url http://localhost:3000/\n');
//     }
//     else if(req.url === '/about'){
//         res.writeHead(200, {'Content-Type': 'text/plain'});
//         res.end('This is the about page at url http://localhost:3000/about.\n');
//     }
//     else if(req.url === '/contact'){
//         res.writeHead(200, {'Content-Type': 'text/plain'});
//         res.end('This is the contact page at url http://localhost:3000/contact.\n');
//     }
//     else{
//         res.writeHead(404, {'Content-Type': 'text/plain'});
//         res.end('404 Not Found\n');
//     }

// })

const server = http.createServer((req, res)=>{
    res.writeHead(200, {'Content-Type': 'application/json'});

    if(req.url === '/student'){
        const student = {
            name: "John Doe",
            age: 21,
            course: "Computer Science"
        }; 
        res.end(JSON.stringify(student));
    }
});

// server listens on port 3000
server.listen(3000, ()=>{
    console.log('Server running at http://localhost:3000/');
});

// create http server that handles different routes like / , /about and /contact 