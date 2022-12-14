// Setup basic express server
const fs = require("fs");
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

// Classes
class Room {
  roomID;
  playerOneID;
  playerTwoID;
  gameBoard;
  gameLocked;
  currentPlayerID;
  gameTitle;

  constructor(roomID, playerOneID, playerTwoID, gameBoard, gameTitle) {
    this.roomID = roomID;
    this.playerOneID = playerOneID;
    this.playerTwoID = playerTwoID;
    this.gameBoard = gameBoard;
    this.gameLocked = false;
    this.currentPlayerID = playerOneID;
    this.gameTitle = gameTitle;
  }
}

class Player {
  constructor(id){
    this.id = id
    this.currentRoomID = null;
  }
}


let roomList = [];
let playerList = [];
let ticTacToeQueue = [];
let mancalaQueue = [];
let numUsers = 0;
let gameBoardTTT = [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
let gameBoardMancala = [4, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 0];


const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const PLAYERONEMANCALA = 6;
const PLAYERTWOMANCALA = 13;
const MANCALABOARDSIZE = 14;

io.on('connection', (socket) => {
  numUsers++;

  console.log("" + numUsers + " New user: " + socket.id);

  addPlayerToplayerList(socket.id, playerList);
  printPlayerList(playerList);


  // #########################################################################

  //create the hash table
  userData = createHashArray()

  //socket handler for login attempt
  socket.on('loginAttempt', (...args)=> {

	  //if the username exists
	  if( userData[hashFunction(args[0])] != undefined ){

		  //if the password matches log them in
		  if(userData[hashFunction(args[0])][4] == args[1]){
			 let name = userData[hashFunction(args[0])][2] + " " + userData[hashFunction(args[0])][3];
			 socket.emit('loginAccepted', args[0], name);
		  }

		  //otherwise password is wrong
		  else{
			  socket.emit('passwordFailed', "");
		  }

	  }
	  //otherwise the username doesnt exist
	  else{
		  socket.emit("userNonexistant", "");
	  }

  });

  //socket handler for sign up attempt
  socket.on('signupAttempt', (...args) => {

		//check if username is already taken
		if( userData[hashFunction(args[0])] == undefined){

			//if not, create profile
			signUp(args[0], args[1], args[2], args[3]);

			socket.emit('signupSuccess', "");
		}

		//otherwise the name is taken
		else{
			socket.emit('usernameTaken', "");
		}

  });

  // #########################################################################


  // Queuing


  socket.on('joinTicTacToeQueue', (arg) => {
    let roomID;
    addPlayerToQueueList(socket.id, playerList, ticTacToeQueue);
    printQueueList(ticTacToeQueue);

    // Check if there are enough players in queue to create room
    if(checkToCreateRoom(ticTacToeQueue)) {
      roomObject = createRoom(ticTacToeQueue, gameBoardTTT, "TTT");

      // Assign rooms to clients
      io.to(roomObject.playerOneID).emit("joinTicTacToeRoom",
                                              roomObject.roomID);
      io.to(roomObject.playerTwoID).emit("joinTicTacToeRoom",
                                              roomObject.roomID);

      // Send client command to change page
      socket.to(roomObject.roomID).emit("moveToTicTacToe", "");
    }
  });

  socket.on('joinMancalaQueue', (arg) => {
    let roomID;
    addPlayerToQueueList(socket.id, playerList, mancalaQueue);
    printQueueList(mancalaQueue);

    // Check if there are enough players in queue to create room
    if(checkToCreateRoom(mancalaQueue)) {
      roomObject = createRoom(mancalaQueue, gameBoardMancala, "Mancala");

      // Assign rooms to clients
      io.to(roomObject.playerOneID).emit("joinMancalaRoom",
                                              roomObject.roomID);
      io.to(roomObject.playerTwoID).emit("joinMancalaRoom",
                                              roomObject.roomID);

      // Send client command to change page
      socket.to(roomObject.roomID).emit("moveToMancala", "");
    }
  });

  // Mancala

  socket.on("joinMancalaRoom", (roomID) => {
    let currentRoom = getCurrentRoomFromID(roomID, roomList);
    // Reset players to null to reassign after they reconnect
    currentRoom.playerOneID = null;
    currentRoom.playerTwoID = null;
    currentRoom.currentPlayerID = null;
    // Have client join room
    socket.join(roomID);
    // Send client command to change page
    io.in(roomID).emit("moveToMancala", "");
    printRoomList(roomList)
  })

  socket.on("rejoinRoomMancala", (roomID) => {
    room = getCurrentRoomFromID(roomID, roomList);
    if(room.playerOneID == null) {
      // Set client to player one in current room
      socket.join(room.roomID);
      room.playerOneID = socket.id;
      room.currentPlayerID = socket.id;

      player = getPlayerFromID(socket.id, playerList);
      player.currentRoomID = room.roomID;

      io.to(socket.id).emit("playerAssignment", 1);
      io.to(socket.id).emit("playerTurnMancala", "");
    }
    else if (room.playerTwoID == null) {

      // Set client to player two  in current room
      socket.join(room.roomID);
      room.playerTwoID = socket.id;

      player = getPlayerFromID(socket.id, playerList);
      player.currentRoomID = room.roomID;

      io.to(socket.id).emit("playerAssignment", 2);
      io.to(socket.id).emit("notTurnMancala", "");
    }
    io.in(roomID).emit("updateGameBoardMancala", room.gameBoard);
  })

  socket.on("cellClickedMancala", (cellClickedIndex) => {
    handleCellClickedMancala(socket, io, cellClickedIndex)
  })

  socket.on("restartGameMancala", (arg) => {
    restartGameMancala(socket, io)
  })

  // Tic Tac Toe

  socket.on("joinTicTacToeRoom", (roomID) => {
    let currentRoom = getCurrentRoomFromID(roomID, roomList);
    // Reset players to null to reassign after they reconnect
    currentRoom.playerOneID = null;
    currentRoom.playerTwoID = null;
    currentRoom.currentPlayerID = null;
    // Have client join room
    socket.join(roomID);
    // Send client command to change page
    io.in(roomID).emit("moveToTicTacToe", "");
  })

  socket.on("rejoinRoomTTT", (roomID) => {
    room = getCurrentRoomFromID(roomID, roomList);
    if(room.playerOneID == null) {
      // Set client to player one in current room
      socket.join(room.roomID);
      room.playerOneID = socket.id;
      room.currentPlayerID = socket.id;

      player = getPlayerFromID(socket.id, playerList);
      player.currentRoomID = room.roomID;

      io.to(socket.id).emit("playerTurnTTT", "");
    }
    else if (room.playerTwoID == null) {

      // Set client to player two  in current room
      socket.join(room.roomID);
      room.playerTwoID = socket.id;

      player = getPlayerFromID(socket.id, playerList);
      player.currentRoomID = room.roomID;

      io.to(socket.id).emit("notTurnTTT", "");
    }
  })

  socket.on("cellClickedTTT", (cellClickedIndex) => {

    handleCellClickedTTT(socket, io, cellClickedIndex)
  })

  socket.on("restartGameTTT", (arg) => {
    restartGameTTT(socket, io)
  })

  socket.on("sendChatMsg", (messageData) => {
    let currentRoom = getRoomFromPlayerID(socket.id, playerList, roomList);
    io.in(currentRoom.roomID).emit("sendChatMsg", messageData);
  })

  socket.on('disconnect', () => {
    numUsers--;
    // Close room if player was in room, and send other player to lobby
    // closeRoom(socket.id, io);
    removePlayerFromplayerList(socket.id, playerList);
    removePlayerFromQueueList(socket.id, ticTacToeQueue);
    // Remove empty rooms
    setTimeout(() => {removeEmptyRooms(roomList)}, 5000);

  });

});

// Mancala functions

/* ########################################### SIGN UP##################################################### */
function signUp(username, firstname, lastname, password){
	//initialize the string ot go into the file
	let userData = '\n' + hashFunction(username) + ' ' + username + ' ' + firstname + ' ' + lastname + ' ' + password + ',';

	//write the data into the user data file
	fs.appendFile('userData.txt', userData, err => {
		if (err) {
			console.error(err);
		}
	});
}

/* ########################################### CREATE HASH ARRAY ##################################################### */
function createHashArray(){
	//read the data file into one long string
	let fileString = fs.readFileSync('userData.txt').toString();

	//intitialize the data file string index and the hash table array of arrays
	let i = 0;
	const allUserData = new Array;

	// loop through all values of the data file and put into user data
	while(i < fileString.length){
		//intialize the arrary of individuals user data
		const userData = new Array;

		//get the hash of the current user
		let hash="";

		while(fileString[i] != " "){
			//the first digits of each line are hash, and put them into hash variable
			hash = hash + fileString[i];
			i++;
		}

		//get off of the space character
		i++;

		//make hash an integer
		hash = parseInt(hash);

		//set the first entry of the users array to their hash
		userData[0] = hash;

		//create user data index
		let userDataIndex = 1;

		//while not at the end of a line, write data into an array
		while(true){

			let string = ""

			//for each string in user, go until end space or comma
			while( fileString[i] != " " && fileString[i] != ',' ){
				string = string + fileString[i];
				i++;
			}
			//put the data into the users data array
			userData[userDataIndex] = string;
			userDataIndex++;

			//if comma, exit loop
			if(fileString[i] == ','){
				break;
			}

			//increment data file string by 1 to get off space
			i++;
		}

		//put the users data into the index with the value of their hash
		allUserData[hash] = userData;


		//increment until
		while(fileString[i] != ','){
			i++;
		}
		//increment by one more to get a new line
		i++;
	}

	//console.log(allUserData);

	//return the user data array of arrays
	return allUserData;
}
/* ########################################### HASH FUNCTION ################################# */
function hashFunction(username){
   let hashValue = 0;
   const passwordArray = username.split("");

   for( let i = 0; i < passwordArray.length; i++ ){
	  hashValue += passwordArray[i].charCodeAt(0);
	  hashValue *= passwordArray[i].charCodeAt(0);
   }

   hashValue %= 1000;

   return hashValue;
}

// Tic Tac Toe functions


// Handles cell click for mancala
//  Uses: handleCellClickedMancalaHelper function
function handleCellClickedMancala(socket, io, cellClickedIndex) {
  // Get current room and player
  let currentPlayer = getPlayerFromID(socket.id, playerList);
  let currentRoom = getRoomFromPlayer(currentPlayer, roomList);
  let changePlayer = true;

  // Return out of function if the game is locked or client is not current player
  if(currentRoom.gameLocked || socket.id != currentRoom.currentPlayerID
     || currentRoom.gameBoard[cellClickedIndex] == 0) {
    return;
  }


  // Lock game
  currentRoom.gameLocked = true;

  // Check if current player is player one
  changePlayer = handleCellClickedMancalaHelper(cellClickedIndex, currentPlayer.id,
                                                currentRoom.playerOneID,
                                                currentRoom.playerTwoID,
                                                currentRoom)
  io.in(currentRoom.roomID).emit('updateGameBoardMancala', currentRoom.gameBoard)

  // Check if game over
  if (checkForGameOverMancala(socket, io, currentRoom)) {
    return
  }

  if(changePlayer) {
    changeCurrentPlayerMancala(socket, io, currentRoom);
  }
  else {
    currentRoom.gameLocked = false;
  }
}

// Handles mancala specific rules
function handleCellClickedMancalaHelper(index, currentPlayerID, playerOneID,
                                        playerTwoID, currentRoom) {
  let currentNumStones = currentRoom.gameBoard[index];
  currentRoom.gameBoard[index % MANCALABOARDSIZE] = 0;
  // Moves mancala stones across board
  while(currentNumStones > 0) {

    index++;
    // Check if player one and is not own mancala
    if(currentPlayerID == playerOneID && index % MANCALABOARDSIZE != PLAYERTWOMANCALA) {
      currentRoom.gameBoard[index % MANCALABOARDSIZE]++;
      currentNumStones--;
    }
    // Check if player two and is not own mancala
    if(currentPlayerID == playerTwoID && index % MANCALABOARDSIZE != PLAYERONEMANCALA) {
      currentRoom.gameBoard[index % MANCALABOARDSIZE]++;
      currentNumStones--;
    }

  }

  // Normalize index to get correct index and avoid out of bounds index
  let normalizedIndex = index % MANCALABOARDSIZE;

  // Handle case that last stone landed in own side and slot was empty
  if(currentPlayerID == playerOneID && normalizedIndex > 0
     && normalizedIndex < PLAYERONEMANCALA
     && currentRoom.gameBoard[normalizedIndex] == 1)
  {
    currentRoom.gameBoard[normalizedIndex] +=
              currentRoom.gameBoard[PLAYERTWOMANCALA - (normalizedIndex + 1)];
    currentRoom.gameBoard[PLAYERTWOMANCALA - (normalizedIndex + 1)] = 0;
  }
  else if (currentPlayerID == playerTwoID
           && normalizedIndex > PLAYERONEMANCALA
           && normalizedIndex < PLAYERTWOMANCALA
           && currentRoom.gameBoard[normalizedIndex] == 1)
  {
    currentRoom.gameBoard[normalizedIndex]
          += currentRoom.gameBoard[PLAYERTWOMANCALA - (normalizedIndex + 1)];
    currentRoom.gameBoard[PLAYERTWOMANCALA - (normalizedIndex + 1)] = 0;
  }

  // Handle case that last stone landed in own mancala
  if(currentPlayerID == playerOneID && normalizedIndex == PLAYERONEMANCALA) {
    return false;
  }
  else if(currentPlayerID == playerTwoID && normalizedIndex == PLAYERTWOMANCALA) {
    return false;
  }

  return true;
}

// Check if mancala game has ended, if so check which player won/draw
//  Uses checkForGameOverMancalaHelper
function checkForGameOverMancala(socket, io, currentRoom) {
  let index = 0;
  let playerOneDone = true;
  let playerTwoDone = true;

  // Check if playerOne side is completed
  for(index = 0; index < PLAYERONEMANCALA; index++) {
    if(currentRoom.gameBoard[index] != 0) {
      playerOneDone = false;
    }
  }

  if(playerOneDone) {
    checkForGameOverMancalaHelper(socket, io, currentRoom, currentRoom.playerTwoID)
    return;
  }

  // Check if player two side is completed
  for(index = PLAYERONEMANCALA + 1; index < PLAYERTWOMANCALA; index++) {
    if(currentRoom.gameBoard[index] != 0) {
      playerTwoDone = false;
    }
  }

  if(playerTwoDone) {
    checkForGameOverMancalaHelper(socket, io, currentRoom, currentRoom.playerOneID)
  }
}

function checkForGameOverMancalaHelper(socket, io, currentRoom, playerWithStones) {
  let index = 0;
  let finalIndex = 0;
  let stoneSum = 0;
  let mancalaToAddTo = 0;

  if(playerWithStones == currentRoom.playerOneID) {
    index = 0;
    finalIndex = PLAYERONEMANCALA - 1;
    playerOneIsWithStones = true;
    mancalaToAddTo = PLAYERONEMANCALA;
  }
  else {
    index = PLAYERONEMANCALA + 1;
    finalIndex = PLAYERTWOMANCALA - 1;
    mancalaToAddTo = PLAYERTWOMANCALA;
  }

  while(index <= finalIndex) {
    stoneSum += currentRoom.gameBoard[index];
    currentRoom.gameBoard[index] = 0;

    index++;
  }

  currentRoom.gameBoard[mancalaToAddTo] += stoneSum;

  // Send gameboard
  io.in(currentRoom.roomID).emit('updateGameBoardMancala', currentRoom.gameBoard)
  // Check who won
  // DRAW
  if(currentRoom.gameBoard[PLAYERONEMANCALA] == currentRoom.gameBoard[PLAYERTWOMANCALA]) {
    io.in(currentRoom.roomID).emit("gameDrawMancala", "Draw");
  }
  // Player one won
  else if(currentRoom.gameBoard[PLAYERONEMANCALA] > currentRoom.gameBoard[PLAYERTWOMANCALA]) {
    io.in(currentRoom.roomID).emit("gameWonMancala", currentRoom.playerOneID);
  }
  // Player two won
  else {
    io.in(currentRoom.roomID).emit("gameWonMancala", currentRoom.playerTwoID);
  }

}

// Changes current player for mancala
function changeCurrentPlayerMancala(socket, io, currentRoom) {
  // Send to current player
  io.to(currentRoom.currentPlayerID).emit('notTurnMancala', '')

  // Switch current player
  if(currentRoom.currentPlayerID == currentRoom.playerOneID) {
    currentRoom.currentPlayerID = currentRoom.playerTwoID;
  }
  else {
    currentRoom.currentPlayerID = currentRoom.playerOneID;
  }

  // Send to new current player
  io.to(currentRoom.currentPlayerID).emit('playerTurnMancala', '')
  currentRoom.gameLocked = false;
}

// Resets gameboard and player turn and sends this info to players
function restartGameMancala(socket, io) {
  let currentRoom = getRoomFromPlayerID(socket.id, playerList, roomList);

  // Resets gameboard and current player
  currentRoom.gameBoard = gameBoardMancala;
  currentRoom.currentPlayerID = currentRoom.playerOneID
  // Send data to clients
  io.in(currentRoom.roomID).emit("updateGameBoardMancala", currentRoom.gameBoard);

  // Send current player turn to client and turn off game lock
  io.to(currentRoom.playerOneID).emit("playerTurnMancala", "");
  io.to(currentRoom.playerTwoID).emit("notTurnMancala", "");
  // Unlocks game
  currentRoom.gameLocked = false;
}

// Tic Tac Toe functions

// Handles cell click event from client
function handleCellClickedTTT(socket, io, cellClickedIndex) {
  // Get current room and player
  let currentPlayer = getPlayerFromID(socket.id, playerList);
  let currentRoom = getRoomFromPlayer(currentPlayer, roomList);

  // Return out of function if the game is locked or client is not current player
  if(currentRoom.gameLocked || socket.id != currentRoom.currentPlayerID) {
    return;
  }

  // Allow click if cell is not used, otherwise, return out of function
  if(currentRoom.gameBoard[cellClickedIndex] != 0) {
    return;
  }

  // Lock game
  currentRoom.gameLocked = true;

  // Check if current player is player one
  if(currentRoom.currentPlayerID == currentRoom.playerOneID) {
    // Assign game cell to player one
    currentRoom.gameBoard[cellClickedIndex] = 1;
    io.in(currentRoom.roomID).emit('updateGameCellTTT',
                                   {"Cell Index": cellClickedIndex, "text": 'x'})
  }
  else {  // Otherwise, current player is player two
    // Assign game cell to player two
    currentRoom.gameBoard[cellClickedIndex] = 2;
    io.in(currentRoom.roomID).emit('updateGameCellTTT',
                                   {"Cell Index": cellClickedIndex, "text": 'o'})
  }

  // Check if game over
  if (checkForGameOverTTT(socket, io, currentRoom)) {
    return
  }

  changeCurrentPlayerTTT(socket, io, currentRoom);
}

// Checks if game is over
// Sends 'gameDrawTTT' message, if game resulted in a draw
// Sends 'gameWonTTT' message, if game resulted in a win
// Locks game if game resulted in a draw or win
function checkForGameOverTTT(socket, io, currentRoom) {
  let index = 0;
  let roundDraw = !currentRoom.gameBoard.includes( 0 );

  //begin loop to test win conditions
  while( index <= 7) {

      //load win condition at current index for testing
      const winCondition = winningConditions[ index ];

      //load testing variables at index of possible win condition
      let cell1 = currentRoom.gameBoard[ winCondition[ 0 ] ];
      let cell2 = currentRoom.gameBoard[ winCondition[ 1 ] ];
      let cell3 = currentRoom.gameBoard[ winCondition[ 2 ] ];

      //check for empty cell
      if ( cell1 == 0 || cell2 == 0 || cell3 == 0 ) {
          //increment index
          index++;

          //continue loop
          continue;
      }

      //check for win condition (all cells equal)
      if (cell1 === cell2 && cell2 === cell3 ) {
          // send round won to clients and return true
          io.in(currentRoom.roomID).emit("gameWonTTT",
                                          currentRoom.currentPlayerID);
          return true;
      }

      //increment index
      index++;
  }
  //end testing loop

  if(roundDraw) {
    // Send draw to clients and return true
    io.in(currentRoom.roomID).emit("gameDrawTTT", "Draw")
    return true;
  }

  if(roundDraw) {
    // Send draw to clients and return true
    io.in(currentRoom.roomID).emit("gameDrawTTT", "Draw")
    return true;
  }

  //otherwise, assume no winner
  return false
}

// Changes current player
// If playerOne was last player, playerTwo is new player and vis versa
// Unlocks game after completeing operation
function changeCurrentPlayerTTT(socket, io, currentRoom) {
  // Send to current player
  io.to(currentRoom.currentPlayerID).emit('notTurnTTT', '')

  // Switch current player
  if(currentRoom.currentPlayerID == currentRoom.playerOneID) {
    currentRoom.currentPlayerID = currentRoom.playerTwoID;
  }
  else {
    currentRoom.currentPlayerID = currentRoom.playerOneID;
  }

  // Send to new current player
  io.to(currentRoom.currentPlayerID).emit('playerTurnTTT', '')
  currentRoom.gameLocked = false;
}

// Resets game board, and sends update message to clients with updated gameboard
// Unlocks game after operation
function restartGameTTT(socket, io) {
  let currentRoom = getRoomFromPlayerID(socket.id, playerList, roomList);

  // Resets gameboard and current player
  currentRoom.gameBoard = [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
  currentRoom.currentPlayerID = currentRoom.playerOneID
  // Send data to clients
  io.in(currentRoom.roomID).emit("updateGameBoardTTT", currentRoom.gameBoard);

  // Send current player turn to client and turn off game lock
  io.to(currentRoom.playerOneID).emit("playerTurnTTT", "");
  io.to(currentRoom.playerTwoID).emit("notTurnTTT", "");
  // Unlocks game
  currentRoom.gameLocked = false;
}

// Room functions

// Check if queue has enough players to start game
function checkToCreateRoom(queueList) {
  if(queueList.length < 2) {
    return false;
  }
  return true;
}

// Creates a room, assigns players to said room, pushes new room to room list,
// and returns room object
function createRoom(queueList, gameBoard, gameTitle) {
  let roomID = generateRandomID();
  let roomObject = null
  let playerOne = queueList[0];
  let playerTwo = queueList[1];
  let copiedGameBoard = [...gameBoard];

  // Remove player one and two from queue
  queueList.splice(0, 2);

  // Create new room and assign players
  playerOne.currentRoomID = roomID;
  playerTwo.currentRoomID = roomID;
  roomObject = new Room(roomID, playerOne.id, playerTwo.id, copiedGameBoard,
                        gameTitle);
  roomList.push({"RoomID": roomID, "RoomObject": roomObject});

  // return room object
  return roomObject;
}

// Removes room from room list
function removeRoom(roomIDToRemove) {
  let index = 0;

  while(index < roomList.length) {
    if(roomList[index]["RoomID"] == roomIDToRemove) {
      // Removes array element at index: `index`
      roomList.splice(index, 1);

      return;
    }
    index++;
  }
}

// Removes rooms that are empty from room list
function removeEmptyRooms(roomList) {
  let index = 0;

  while(index < roomList.length) {
    if(roomList[index]["RoomObject"].playerOneID == null
       && roomList[index]["RoomObject"].playerTwoID == null) {
        roomList.splice(index, 1);
        index--;
    }
    index++;
  }
}

function closeRoom(playerID, io) {
  let player = getPlayerFromID(playerID, playerList);
  io.in(player.currentRoomID).emit("returnToLobby", "");
  removeRoom(player.currentRoomID);
}

// Generate random ID (string of a number)
function generateRandomID() {
  let randomID = 0;
  let index = 0;
  let runLoop = true;
  // Check if randomID is currently in use
  while(runLoop) {
    runLoop = false;
    randomID = Math.floor(Math.random() * 10000);
    while(index < roomList.length) {
      if(roomList[index]["roomID"] == randomID) {
        runLoop = true;
      }
      index++;
    }
    index = 0;
  }

  return randomID.toString();
}

// Array management functions

// Adds player to player list
function addPlayerToplayerList(playerID, playerList) {
  playerList.push(new Player(playerID));
}

// Removes player from player list
function removePlayerFromplayerList(playerID, playerList) {
  let index = 0;

  while(index < playerList.length) {
    if(playerList[index].id == playerID) {
      // Removes array element at index: `index`
      playerList.splice(index, 1);

      return;
    }
    index++;
  }
}

// Adds player to queue list
function addPlayerToQueueList(playerID, playerList, queueList) {
  let player;
  let index = 0;

  // Get player
  while(index < playerList.length) {
    if(playerList[index].id == playerID) {
      player = playerList[index];
    }
    index++;
  }


  if(player == null) {
    return;
  }


  // Check if player is already in queue
  index = 0;
  while(index < queueList.length) {
    if(queueList[index].id == player.id) {
      // Player is in queue, returns out of function
      return;
    }
    index++;
  }

  queueList.push(player);
}

// Removes player from queue list
function removePlayerFromQueueList(playerID, queueList) {
  let index = 0;

  while(index < queueList.length) {
    if(queueList[index].id == playerID) {
      // Removes array element at index: `index`
      queueList.splice(index, 1);

      return;
    }
    index++;
  }
}

// Get functions

// Returns player from player id
function getPlayerFromID(playerID, playerList) {
  let index = 0;

  while(index < playerList.length) {
    if(playerList[index].id == playerID) {
      return playerList[index];
    }
    index++;
  }

  return null;
}

// Returns room from player id
function getRoomFromPlayerID(playerID, playerList, roomList) {
  let player = getPlayerFromID(playerID, playerList);
  let index = 0;

  while(index < roomList.length) {
    if(roomList[index]["RoomObject"].roomID == player.currentRoomID) {
      return roomList[index]["RoomObject"];
    }
    index++;
  }

  return null;
}

// Returns room from player object
function getRoomFromPlayer(player, roomList) {
  let index = 0;

  while(index < roomList.length) {
    if(roomList[index]["RoomObject"].roomID == player.currentRoomID) {
      return roomList[index]["RoomObject"];
    }
    index++;
  }

  return null;
}

// Returns room object from room id
function getCurrentRoomFromID(roomID, roomList) {
  let index = 0;

  while(index < roomList.length) {
    if(roomList[index]["RoomObject"].roomID == roomID) {
      return roomList[index]["RoomObject"];
    }
    index++;
  }

  return null;
}

// Log functions

function printPlayerList(playerList) {
  let index = 0;

  console.log("Current Player List");
  while(index < playerList.length) {
    console.log(playerList[index]);
    index++;
  }

  console.log("\n\n");
}

function printQueueList(queueList) {
  let index = 0;

  console.log("Current Queue List");
  while(index < queueList.length) {
    console.log(queueList[index]);
    index++;
  }

  console.log("\n\n");
}

function printRoomList(roomList) {
  let index = 0;

  console.log("Current room List");
  while(index < roomList.length) {
    console.log(roomList[index]);
    index++;
  }

  console.log("\n\n");
}
