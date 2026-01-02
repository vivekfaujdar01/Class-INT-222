/**
 * ============================================
 * ADVANCED WEBSOCKET SERVER - CHAT ROOM
 * ============================================
 * This demonstrates real-world WebSocket patterns:
 * - Multiple clients
 * - Broadcasting
 * - User management
 * - Message types
 */

const WebSocket = require('ws');
const http = require('http');
const fs = require('fs');
const path = require('path');

// Create HTTP server to serve the chat client
const server = http.createServer((req, res) => {
    if (req.url === '/' || req.url === '/chat') {
        // Serve the chat client HTML
        const chatPath = path.join(__dirname, 'chat-client.html');
        fs.readFile(chatPath, (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Error loading chat client');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    } else {
        res.writeHead(404);
        res.end('Not found');
    }
});

// Create WebSocket server attached to HTTP server
const wss = new WebSocket.Server({ server });

// Store connected clients with their metadata
const clients = new Map();

// Generate unique ID for each client
let clientIdCounter = 0;
function generateClientId() {
    return `user_${++clientIdCounter}`;
}

// Generate random username
function generateUsername() {
    const adjectives = ['Happy', 'Clever', 'Swift', 'Brave', 'Gentle'];
    const nouns = ['Panda', 'Eagle', 'Tiger', 'Dolphin', 'Fox'];
    const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    return `${adj}${noun}${Math.floor(Math.random() * 100)}`;
}

console.log('🚀 Chat Server starting...');

/**
 * Handle new WebSocket connections
 */
wss.on('connection', (ws, req) => {
    // Create client metadata
    const clientId = generateClientId();
    const username = generateUsername();

    // Store client info
    clients.set(ws, {
        id: clientId,
        username: username,
        connectedAt: new Date(),
        ip: req.socket.remoteAddress
    });

    console.log(`✅ ${username} (${clientId}) connected`);

    // Send welcome message to new client
    sendToClient(ws, {
        type: 'welcome',
        userId: clientId,
        username: username,
        message: `Welcome to the chat, ${username}!`,
        onlineUsers: getOnlineUsers()
    });

    // Broadcast to others that someone joined
    broadcast({
        type: 'user_joined',
        username: username,
        onlineCount: clients.size
    }, ws); // Exclude the joining client

    /**
     * Handle incoming messages
     */
    ws.on('message', (data) => {
        const client = clients.get(ws);

        try {
            const message = JSON.parse(data.toString());
            console.log(`📨 ${client.username}: ${JSON.stringify(message)}`);

            // Handle different message types
            switch (message.type) {
                case 'chat':
                    handleChatMessage(ws, client, message);
                    break;

                case 'private':
                    handlePrivateMessage(ws, client, message);
                    break;

                case 'set_username':
                    handleSetUsername(ws, client, message);
                    break;

                case 'typing':
                    handleTypingIndicator(ws, client, message);
                    break;

                default:
                    sendToClient(ws, {
                        type: 'error',
                        message: `Unknown message type: ${message.type}`
                    });
            }
        } catch (error) {
            console.error('Error parsing message:', error);
            sendToClient(ws, {
                type: 'error',
                message: 'Invalid message format'
            });
        }
    });

    /**
     * Handle client disconnect
     */
    ws.on('close', (code, reason) => {
        const client = clients.get(ws);
        if (client) {
            console.log(`❌ ${client.username} disconnected`);

            // Notify others
            broadcast({
                type: 'user_left',
                username: client.username,
                onlineCount: clients.size - 1
            }, ws);

            // Remove from clients map
            clients.delete(ws);
        }
    });

    ws.on('error', (error) => {
        console.error(`WebSocket error: ${error.message}`);
    });
});

/**
 * MESSAGE HANDLERS
 */

function handleChatMessage(ws, client, message) {
    const chatMessage = {
        type: 'chat',
        from: client.username,
        userId: client.id,
        text: message.text,
        timestamp: new Date().toISOString()
    };

    // Broadcast to ALL clients (including sender)
    broadcastToAll(chatMessage);
}

function handlePrivateMessage(ws, client, message) {
    // Find recipient
    const recipient = findClientByUsername(message.to);

    if (recipient) {
        const privateMessage = {
            type: 'private',
            from: client.username,
            to: message.to,
            text: message.text,
            timestamp: new Date().toISOString()
        };

        // Send to recipient
        sendToClient(recipient.socket, privateMessage);

        // Confirm to sender
        sendToClient(ws, {
            ...privateMessage,
            type: 'private_sent'
        });
    } else {
        sendToClient(ws, {
            type: 'error',
            message: `User "${message.to}" not found`
        });
    }
}

function handleSetUsername(ws, client, message) {
    const oldUsername = client.username;
    const newUsername = message.username.trim();

    // Validate username
    if (!newUsername || newUsername.length < 3) {
        sendToClient(ws, {
            type: 'error',
            message: 'Username must be at least 3 characters'
        });
        return;
    }

    // Check if username is taken
    if (isUsernameTaken(newUsername, ws)) {
        sendToClient(ws, {
            type: 'error',
            message: 'Username already taken'
        });
        return;
    }

    // Update username
    client.username = newUsername;

    // Confirm to user
    sendToClient(ws, {
        type: 'username_changed',
        oldUsername: oldUsername,
        newUsername: newUsername
    });

    // Notify others
    broadcast({
        type: 'username_changed',
        oldUsername: oldUsername,
        newUsername: newUsername
    }, ws);
}

function handleTypingIndicator(ws, client, message) {
    broadcast({
        type: 'typing',
        username: client.username,
        isTyping: message.isTyping
    }, ws);
}

/**
 * UTILITY FUNCTIONS
 */

// Send message to a specific client
function sendToClient(ws, data) {
    if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify(data));
    }
}

// Broadcast to all clients EXCEPT the excluded one
function broadcast(data, excludeWs = null) {
    const message = JSON.stringify(data);
    clients.forEach((client, ws) => {
        if (ws !== excludeWs && ws.readyState === WebSocket.OPEN) {
            ws.send(message);
        }
    });
}

// Broadcast to ALL clients including sender
function broadcastToAll(data) {
    const message = JSON.stringify(data);
    clients.forEach((client, ws) => {
        if (ws.readyState === WebSocket.OPEN) {
            ws.send(message);
        }
    });
}

// Get list of online users
function getOnlineUsers() {
    const users = [];
    clients.forEach((client) => {
        users.push({
            id: client.id,
            username: client.username
        });
    });
    return users;
}

// Find client by username
function findClientByUsername(username) {
    for (const [ws, client] of clients) {
        if (client.username.toLowerCase() === username.toLowerCase()) {
            return { socket: ws, ...client };
        }
    }
    return null;
}

// Check if username is taken
function isUsernameTaken(username, excludeWs) {
    for (const [ws, client] of clients) {
        if (ws !== excludeWs && client.username.toLowerCase() === username.toLowerCase()) {
            return true;
        }
    }
    return false;
}

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`🌐 HTTP Server: http://localhost:${PORT}`);
    console.log(`🔌 WebSocket Server: ws://localhost:${PORT}`);
    console.log(`\n📱 Open http://localhost:${PORT} in multiple browser tabs to test!`);
});
