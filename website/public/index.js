var socket = io()

document.getElementById( 'joinTTT' ).addEventListener(
                                          'click', sendJoinMessageTTT );
document.getElementById( 'joinMancala' ).addEventListener(
                                          'click', sendJoinMessageMancala );

const loading = document.getElementById( 'loading' )

function sendJoinMessageTTT() {
  loading.classList.remove("loading-off");
  loading.classList.add("loading-on");
  socket.emit("joinTicTacToeQueue", "");
}

function sendJoinMessageMancala() {
  loading.classList.remove("loading-off");
  loading.classList.add("loading-on");
  socket.emit("joinMancalaQueue", "");
}

// Listeners
socket.on('moveToTicTacToe', (arg) => {
  window.location.href = "ticTacToe.html";
})

socket.on('moveToMancala', (arg) => {
  window.location.href = "mancala.html";
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

socket.on('joinMancalaRoom', (roomID) => {
  window.localStorage.setItem("roomID", roomID)
  socket.emit("joinMancalaRoom", roomID)
})
