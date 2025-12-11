const express = require('express');
const http = require('http');
const path = require('path');
const WebSocket = require('ws');

const PORT = 3003;
const app = express();

app.use(express.static(__dirname));
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'CA.html')));

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

setInterval(() => {
    const msg = JSON.stringify({ time: Date.now() });
    wss.clients.forEach(c => c.readyState === WebSocket.OPEN && c.send(msg));
}, 1000);

server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
