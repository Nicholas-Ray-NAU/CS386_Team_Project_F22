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

// Tic Tac Toe

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

class Player {
  constructor(id){
    this.id = id
  }
}

let numUsers = 0;
let maxUsers = 2;
let playerOne = null;
let playerTwo = null;
let currentPlayer = null;
let gameBoard = [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
let gameLocked = true;

io.on('connection', (socket) => {
  numUsers++;
  // Force disconnects any client that goes over 2 player max
  if(numUsers > maxUsers) {
    socket.disconnect()
    return
  }


  if(playerOne == null) {
    playerOne = new Player(socket.id);
    currentPlayer = playerOne;
  }
  else {
    playerTwo = new Player(socket.id);
    gameLocked = false;
  }

  restartGame(socket)
  socket.emit('updateGameBoard', gameBoard)
  socket.broadcast.emit('updateGameBoard', gameBoard)

  // Handle cell clicked
  socket.on('cellClicked', (cellClickedIndex) => {
    handleCellClicked(socket, cellClickedIndex)
  })

  socket.on('restartGame', (arg) => {
    restartGame(socket)
  })

  socket.on('disconnect', () => {
    if(playerOne != null && socket.id == playerOne.id) {
      playerOne = null;
    }
    else {
      playerTwo = null;
    }

    numUsers--;
  });
})


function handleCellClicked(socket, cellClickedIndex) {
  if(gameLocked || socket.id != currentPlayer.id) {
    return;
  }

  // Allow click if cell is not used, otherwise, return out of function
  if(gameBoard[cellClickedIndex] != 0) {
    return;
  }

  gameLocked = true

  if(currentPlayer == playerOne) {
    gameBoard[cellClickedIndex] = 1;
    socket.emit('updateGameCell', {"Cell Index": cellClickedIndex, "text": 'x'})
    socket.broadcast.emit('updateGameCell', {"Cell Index": cellClickedIndex, "text": 'x'})
  }
  else {
    gameBoard[cellClickedIndex] = 2;
    socket.emit('updateGameCell', {"Cell Index": cellClickedIndex, "text": 'o'})
    socket.broadcast.emit('updateGameCell', {"Cell Index": cellClickedIndex, "text": 'o'})
  }


  // Check if game over
  if (checkForGameOver(socket)) {
    return
  }

  changeCurrentPlayer(socket);
}

// If game is won or is in draw state, sends message to client and
// returns true if game has been completed
function checkForGameOver(socket) {
  let index = 0;
  let roundDraw = !gameBoard.includes( 0 );

  if(roundDraw) {
    // Send draw to clients and return true
    socket.emit("gameDraw", "Draw")
    socket.broadcast.emit("gameDraw", "Draw")
    return true;
  }

  //begin loop to test win conditions
  while( index <= 7) {

      //load win condition at current index for testing
      const winCondition = winningConditions[ index ];

      //load testing variables at index of possible win condition
      let cell1 = gameBoard[ winCondition[ 0 ] ];
      let cell2 = gameBoard[ winCondition[ 1 ] ];
      let cell3 = gameBoard[ winCondition[ 2 ] ];

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
          socket.emit("gameWon", currentPlayer.id)
          socket.broadcast.emit("gameWon", currentPlayer.id)
          return true;
      }

      //increment index
      index++;
  }
  //end testing loop

  //otherwise, assume no winner
  return false
}

function changeCurrentPlayer(socket) {
  socket.emit('notTurn', '')  // Send to current player

  if(currentPlayer.id == playerOne.id) {
    currentPlayer = playerTwo;
  }
  else {
    currentPlayer = playerOne;
  }

  socket.to(currentPlayer.id).emit('playerTurn', '')
  gameLocked = false;
}

function restartGame(socket) {
  gameBoard = [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
  currentPlayer = playerOne
  // Send data to clients TODO
  socket.emit('updateGameBoard', gameBoard)
  socket.broadcast.emit('updateGameBoard', gameBoard)
  if(playerOne != null && playerTwo != null) {
    if(socket.id == playerOne.id) {
      socket.emit('playerTurn', '')
      socket.to(playerTwo.id).emit('notTurn', '')
    }
    else {
      socket.to(playerOne.id).emit('playerTurn', '')
      socket.emit('notTurn', '')
    }
    gameLocked = false;
  }
}
