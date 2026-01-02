import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const server = createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/room.html');
});

// When a client connects
io.on('connection', (socket) => {
    console.log('A user connected');


    // Listen for chat messages
    socket.on('chat message', (msg) => {
        console.log('Message: ' + msg);
        // Broadcast message to all clients
        io.emit('chat message', msg);
    });

    // Handle disconnect
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
