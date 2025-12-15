import express from 'express';
import http from 'http';
import {Server} from 'socket.io';
import path from 'path'; 
import { fileURLToPath } from 'url';
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const server = http.createServer(app);
const io = new Server(server);


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'server.html'));
})

io.on('connection', (socket) => {
    console.log("user connnected");

    socket.on('chatMessage', (msg) => {
        io.emit('chatMessage', msg)
    });

    socket.on('disconnect', () => { // Corrected event name 'disconnect'
        console.log("User disconnected"); // Corrected log message
    })
});

server.listen(3000, () => console.log("Server is listening on 3000"));