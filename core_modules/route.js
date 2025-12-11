const http = require('http');

const server = http.createServer((req, res)=>{
    if(req.url === '/' && req.method === 'GET'){
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Server is running at url http://localhost:3000/\n');
    }
    else if(req.url === '/about' && req.method === 'GET'){
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('This is the about page at url http://localhost:3000/about.\n');
    }
    else{
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('404 Not Found\n');
    }
});

server.listen(3000, () => {
    console.log('Server is running at http://localhost:3000/');
});


