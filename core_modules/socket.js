const http = require("http");
const WebSocket = require("ws");

// 1) Make an HTTP server
const server = http.createServer((req, res) => {
  res.end("WebSocket Chat Server");
});

// 2) Attach WebSocket server to HTTP server
const wss = new WebSocket.Server({ server });

// 3) When a client connects
wss.on("connection", (socket) => {
  console.log("A user connected");

  // 4) Receive message and broadcast to everyone
  socket.on("message", (msg) => {
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(msg); // send same message to all
      }
    });
  });
});

server.listen(3000, () => console.log("Server running on http://localhost:3000"));
