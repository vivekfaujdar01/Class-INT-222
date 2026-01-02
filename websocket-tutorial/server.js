/**
 * ============================================
 * BASIC WEBSOCKET SERVER
 * ============================================
 * This file demonstrates how to create a simple
 * WebSocket server using the 'ws' library in Node.js
 */

// Import the WebSocket library
const WebSocket = require('ws');

// Create a WebSocket server on port 8080
// The server listens for incoming WebSocket connections
const wss = new WebSocket.Server({ port: 8080 });

console.log('🚀 WebSocket Server started on ws://localhost:8080');

/**
 * EVENT: 'connection'
 * Triggered when a new client connects to the server
 * 
 * @param {WebSocket} ws - The WebSocket connection object for this client
 * @param {http.IncomingMessage} req - The HTTP request that initiated the connection
 */
wss.on('connection', (ws, req) => {
    // Get client's IP address for logging
    const clientIP = req.socket.remoteAddress;
    console.log(`✅ New client connected from ${clientIP}`);

    // Send a welcome message to the newly connected client
    ws.send(JSON.stringify({
        type: 'welcome',
        message: 'Hello! You are connected to the WebSocket server.',
        timestamp: new Date().toISOString()
    }));

    /**
     * EVENT: 'message'
     * Triggered when the server receives a message from this client
     * 
     * @param {Buffer|ArrayBuffer|Buffer[]} data - The message data received
     * @param {boolean} isBinary - Whether the message is binary
     */
    ws.on('message', (data, isBinary) => {
        // Convert buffer to string
        const message = data.toString();
        console.log(`📨 Received from client: ${message}`);

        // Try to parse as JSON, otherwise treat as plain text
        let parsedMessage;
        try {
            parsedMessage = JSON.parse(message);
        } catch (e) {
            parsedMessage = { text: message };
        }

        // Echo the message back with additional info
        const response = {
            type: 'echo',
            original: parsedMessage,
            serverTime: new Date().toISOString(),
            message: `Server received: "${parsedMessage.text || message}"`
        };

        ws.send(JSON.stringify(response));
        console.log(`📤 Sent response to client`);
    });

    /**
     * EVENT: 'close'
     * Triggered when the client disconnects
     * 
     * @param {number} code - The close code
     * @param {Buffer} reason - The reason for closing
     */
    ws.on('close', (code, reason) => {
        console.log(`❌ Client disconnected. Code: ${code}, Reason: ${reason.toString() || 'No reason provided'}`);
    });

    /**
     * EVENT: 'error'
     * Triggered when an error occurs on the connection
     * 
     * @param {Error} error - The error object
     */
    ws.on('error', (error) => {
        console.error(`⚠️ WebSocket error: ${error.message}`);
    });

    /**
     * EVENT: 'ping'
     * WebSocket protocol includes ping/pong for connection health checks
     */
    ws.on('ping', () => {
        console.log('🏓 Received ping from client');
    });

    ws.on('pong', () => {
        console.log('🏓 Received pong from client');
    });
});

/**
 * SERVER EVENTS
 */

// Server error handling
wss.on('error', (error) => {
    console.error(`🔥 Server error: ${error.message}`);
});

// Log when server is listening
wss.on('listening', () => {
    console.log('👂 Server is listening for connections...');
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down server...');
    wss.close(() => {
        console.log('✅ Server closed');
        process.exit(0);
    });
});

/**
 * UTILITY: Broadcast message to all connected clients
 * 
 * @param {string} message - Message to broadcast
 */
function broadcast(message) {
    wss.clients.forEach((client) => {
        // Check if client is connected and ready
        if (client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });
}

// Example: Send a heartbeat to all clients every 30 seconds
setInterval(() => {
    const heartbeat = JSON.stringify({
        type: 'heartbeat',
        timestamp: new Date().toISOString(),
        connectedClients: wss.clients.size
    });
    broadcast(heartbeat);
    console.log(`💓 Heartbeat sent to ${wss.clients.size} client(s)`);
}, 30000);
