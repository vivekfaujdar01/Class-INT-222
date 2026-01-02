// Simple Socket.IO Server
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve the client HTML
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/socketio-client.html');
});

// When someone connects
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Send welcome to this user
    socket.emit('welcome', 'Hello! You are connected.');

    // Listen for 'chat' event
    socket.on('chat', (message) => {
        console.log('Message:', message);

        // Broadcast to ALL users (including sender)
        io.emit('chat', message);
    });

    // When user disconnects
    socket.on('disconnect', () => {
        console.log('User left:', socket.id);
    });
});

server.listen(3000, () => {
    console.log('Socket.IO Server running on http://localhost:3000');
});
