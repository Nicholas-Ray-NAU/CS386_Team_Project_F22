var socket = io()

//document.getElementById( 'joinTTT' ).addEventListener('click', sendJoinMessage );

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

/*
						///PROFILE STUFF///
//get the users data 
//socket.emit('changeHTML', "");

//change the html to the users data
socket.on('loadProfile', (...args) => {
	document.querySelector(".username").innerHTML = 'Username: ' + args[0];
	document.querySelector(".fullname").innerHTML = 'Name: ' + args[1];
});
	
*/

