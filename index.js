const express = require("express");
const compression = require("compression");
const http = require("http");
const { Server } = require("socket.io");

const port = process.env.PORT || 3000; // default port: 3000
const app = express();
const server = http.createServer(app); // use express to handle http server
const io = new Server(server);
app.use(compression());
app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});

const onConnection = (socket) => {
  console.log("Socket.io init success");
};

io.on("connection", onConnection);

server.listen(port, () => {
  console.log("Server listening at port %d", port);
});
