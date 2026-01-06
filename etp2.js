// Import required modules
const http = require('http');
const fs = require('fs');

// Step A: Create source.txt with personal info (only once)
const personalInfo = "Name: Vivek Faujdar\nRoll No: 31";

if (!fs.existsSync('source.txt')) {
    fs.writeFileSync('source.txt', personalInfo);
}

// Step B: Create HTTP server
const server = http.createServer((req, res) => {

    if (req.url === '/copy') {

        // Step C: Read source.txt
        fs.readFile('source.txt', 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end("Error reading source file");
                return;
            }

            // Duplicate content into destination.txt
            fs.writeFile('destination.txt', data, (err) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end("Error writing destination file");
                    return;
                }

                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end("File copied successfully from source.txt to destination.txt");
            });
        });

    } else {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end("Use /copy in URL to duplicate the file");
    }
});

// Start server
server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
