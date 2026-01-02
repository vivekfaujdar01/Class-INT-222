// Broadcast Server - Sends messages to ALL connected users
const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8080 });

console.log('Broadcast Server running on ws://localhost:8080');

// When someone connects
server.on('connection', (socket) => {
    console.log('User connected! Total users:', server.clients.size);

    socket.send('Welcome! You are connected.');

    // When we receive a message
    socket.on('message', (message) => {
        console.log('Received:', message.toString());

        // BROADCAST: Send to ALL connected users
        server.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message.toString());
            }
        });
    });

    socket.on('close', () => {
        console.log('User left. Total users:', server.clients.size);
    });
});
