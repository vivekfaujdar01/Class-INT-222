const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res)=> {
    if(req.url === '/'){
        fs.readFile('student.json', 'utf8', (err, data)=>{
            if(err){
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.end('Error reading student data\n');
            }
            else{
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.end(data);
            }
        });
    }
    else{
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('404 Not Found\n');
    }
})

server.listen(3000, () => {
    console.log('Server is running at http://localhost:3000/');
});

