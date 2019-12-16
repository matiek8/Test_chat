const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

server.listen(3001);

app.get('/', function (request, response) {
  response.sendFile(__dirname + '/index.html')
});

const users = [];
const connections = [];

io.sockets.on('connection', function (socket) {
  console.log('Connect');
  connections.push(socket);

  socket.on('disconnect', function (data) {
    connections.splice(connections.indexOf(socket), 1)
    console.log('Disconnect')
  });

  socket.on('send msg', function (data) {
    io.sockets.emit('add msg', {msg: data.msg, name: data.name, className: data.className})
  })
});
