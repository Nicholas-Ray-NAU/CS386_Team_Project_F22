var socket = io()

document.getElementById( 'joinTTT' ).addEventListener('click', sendJoinMessage );

function sendJoinMessage() {
  socket.emit("joinTicTacToeQueue", "");
}


// Listeners
socket.on('moveToTicTacToe', (arg) => {
  window.location.href = "ticTacToe.html";
})

socket.on('joinTicTacToeRoom', (roomID) => {
  socket.emit("joinTicTacToeRoom", roomID)
})
