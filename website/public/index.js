var socket = io()

document.getElementById( 'joinTTT' ).addEventListener('click', sendJoinMessage );

function sendJoinMessage() {
  socket.emit("joinTicTacToeQueue", "");
}

// Listeners
socket.on('moveToTicTacToe', (arg) => {
  window.location.href = "ticTacToe.html";
})

socket.on("setName", (name) => {
  window.localStorage.setItem("name", name);
})

socket.on("setHashID", (hashID) => {
  window.localStorage.setItem("hashID", hashID);
})

socket.on('joinTicTacToeRoom', (roomID) => {
  window.localStorage.setItem("roomID", roomID)
  socket.emit("joinTicTacToeRoom", roomID)
})
