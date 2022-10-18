var socket = io();

var number = document.getElementById('number');
var numClients = document.getElementById('numClients');
const incrementButton = document.getElementById('increment')
const decrementButton = document.getElementById('decrement')
incrementButton.addEventListener('click', increment);
decrementButton.addEventListener('click', decrement);

// Send increment command to server
function increment() {
  socket.emit('incrementNum')
}

// Send decrement command to server
function decrement() {
  socket.emit('decrementNum')
}

// Update number of client number
socket.on('numClients', (arg) => {
  numClients.textContent = arg.toString()
});

// Update current number
socket.on('modifyNum', (arg) => {
  number.textContent = arg.toString()
});
