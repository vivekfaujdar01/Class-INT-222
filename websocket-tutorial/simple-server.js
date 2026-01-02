// Simple WebSocket Server - Beginner Friendly
const WebSocket = require('ws');

// Create server on port 8080
const server = new WebSocket.Server({ port: 8080 });

console.log('Server running on ws://localhost:8080');

// When someone connects
server.on('connection', (socket) => {
    console.log('A user connected!');

    // Send welcome message
    socket.send('Hello from server!');

    // When we receive a message
    socket.on('message', (message) => {
        console.log('Received:', message.toString());

        // Send reply back
        socket.send('Server got: ' + message.toString());
    });

    // When user disconnects
    socket.on('close', () => {
        console.log('User disconnected');
    });
});
