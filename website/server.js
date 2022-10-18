// Setup basic express server
const express = require('express');
const app = express();
const path = require('path');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(path.join(__dirname, 'public')));

// Modify number

let numUsers = 0;
let maxUsers = 2;
let currentNum = 0;

io.on('connection', (socket) => {
  numUsers++;

  // Send current number to client
  socket.emit('modifyNum', currentNum);
  socket.broadcast.emit('modifyNum', currentNum);

  // Send current number of clients to client
  socket.emit('numClients', numUsers);
  socket.broadcast.emit('numClients', numUsers);

  console.log("New user connected")

  // Increment number and send new number to all client
  socket.on('incrementNum', () => {
    currentNum++;
    socket.emit('modifyNum', currentNum);
    socket.broadcast.emit('modifyNum', currentNum);
  })

  // Decrement number and send new number to all client
  socket.on('decrementNum', () => {
    currentNum--;
    socket.emit('modifyNum', currentNum);
    socket.broadcast.emit('modifyNum', currentNum);
  })

  // Send updated client number to all clients
  socket.on('disconnect', () => {
    numUsers--;
    console.log('user disconnected');
    socket.emit('numClients', numUsers);
    socket.broadcast.emit('numClients', numUsers);
  });
})
