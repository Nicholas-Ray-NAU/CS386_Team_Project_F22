var socket = io()

document.getElementById( 'join' ).addEventListener('click', sendJoinMessage );


function sendJoinMessage() {
  console.log("hello");
  socket.emit("joinTicTacToeQueue", "");
}


// Listeners
socket.on('moveToTicTacToe', (arg) => {
  console.log("Hello, I recieved a message");
  window.location.href = "ticTacToe.html";
})

socket.on('joinTicTacToeRoom', (roomID) => {
  console.log("I JOIN ROOM");
  socket.emit("joinTicTacToeRoom", roomID)
})
