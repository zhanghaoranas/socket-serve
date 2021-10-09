import express from 'express';
import compression from 'compression';
import chalk from 'chalk';
import http from 'http';
import { Server } from 'socket.io';
import { getLocalIP } from './utils/index.js';

const port = process.env.PORT || 3000; // default port: 3000
const app = express();
const server = http.createServer(app); // use express to handle http server
const io = new Server(server, {
  allowEIO3: true, // 客户端版本为2.x添加改属性
  cors: {
    origin: 'http://localhost:8010',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});
app.use(compression());
app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

const onConnection = (socket) => {
  console.log('Socket.io init success');
};

io.on('connection', onConnection);

server.listen(port, () => {
  console.log('本地浏览地址', chalk.blue(`http://localhost:${port}`));
  console.log('局域网浏览地址', chalk.blue(`http://${getLocalIP()}:${port}`));
});
