const http = require('http');
const url = require('url');

// Fibonacci function (LOGIC)
function fibonacci(n) {
    if (n <= 1) return n;

    let a = 0, b = 1, c;
    for (let i = 2; i <= n; i++) {
        c = a + b;
        a = b;
        b = c;
    }
    return b;
}

const server = http.createServer((req, res) => {
    
    const parsedUrl = url.parse(req.url, true);

    // Client Page
    if (parsedUrl.pathname === '/' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
            <html>
                <body>
                    <h3>Fibonacci Calculator</h3>

                    <input type="number" id="num" placeholder="Enter n" />
                    <button onclick="send()">Find Fibonacci</button>

                    <p id="result"></p>

                    <script>
                        function send() {
                            let n = document.getElementById("num").value;

                            fetch('/fib?n=' + n)
                                .then(res => res.text())
                                .then(data => {
                                    document.getElementById("result").innerText = data;
                                });
                        }
                    </script>
                </body>
            </html>
        `);
    }

    // Fibonacci Request
    else if (parsedUrl.pathname === '/fib' && req.method === 'GET') {
        const n = parseInt(parsedUrl.query.n);

        let result = fibonacci(n);

        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(`Fibonacci(${n}) = ${result}`);
    }

});

server.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
