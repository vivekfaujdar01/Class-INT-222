const http = require('http');

const server = http.createServer((req, res)=>{
    if(req.method === 'POST' && req.url === '/data'){
        let body = '';
        req.on('data',chunk => {
            body += chunk.toString();
        })

        req.on('end',()=>{
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end(body);
        })
    }
    else{
        res.writeHead(404,{'content-type' : 'text/plain'});
        res.end("Page Not found 404");
    }
})

server.listen(3000,()=>{
    console.log("Server is running on http://localhost:3000");
})

