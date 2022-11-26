var name = window.localStorage.getItem("name");
var roomID = window.localStorage.getItem("roomID");
var hashID = window.localStorage.getItem("hashID");


var socket = io();
socket.emit('rejoinRoomTTT', roomID);

//Listeners (on-click)
document.querySelector( '.game--restart' ).addEventListener(
                                                         'click', restartGame );
const GAMEBOARDCONTAINER = document.getElementById("game--container");
const GAMEBOARDSIZE = 9;

const statusDisplay = document.querySelector('.game--status');
const winningMessage = () => `You won!`;
const losingMessage = () => `You lost!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's your turn`;
const currentPlayerNotTurn = () => `It's not your turn`;

let gameBoard = [];

function createGameBoard() {
  let index;

  // Creates GRIDSIZE amount of boxes for each row
  for(index = 0; index < GAMEBOARDSIZE; index++)
  {
      const cell = document.createElement("div");
      cell.addEventListener('click', handleCellClick)
      cell.setAttribute("data-cell-index", `${index}`)
      cell.classList.add("cell");
      gameBoard.push(cell);
      GAMEBOARDCONTAINER.appendChild(cell);
  }
}

function handleCellClick( clickedCellEvent ) {
  //get clicked cell location
  const clickedCell = clickedCellEvent.target;
  const clickedCellIndex = parseInt( clickedCell.getAttribute(
                                                        'data-cell-index' ))

  // Send event to server
  socket.emit('cellClickedTTT', clickedCellIndex)
}

function restartGame() {
  // Send restart command to server
  socket.emit('restartGameTTT', null)
  statusDisplay.innerHTML = ""
}

function updateGameCell( cellInfo ) {
  // Update game cell with cell index and x or o
  gameBoard[cellInfo["Cell Index"]].innerHTML = cellInfo["text"];
}

function updateGameBoard( updatedGameBoard ) {
  let index;

  for(index = 0; index < GAMEBOARDSIZE; index++) {
    if(updatedGameBoard[index] == 0) {
      gameBoard[index].innerHTML = "";
    }
    else if (updatedGameBoard[index] == 1) {
      gameBoard[index].innerHTML = "x";
    }
    else if (updatedGameBoard[index] == 2) {
      gameBoard[index].innerHTML = "o";
    }
  }
}

function gameWon( winnerId ) {
  if(socket.id == winnerId) {
    statusDisplay.innerHTML = winningMessage();
    window.alert( winningMessage() );
  }
  else {
    statusDisplay.innerHTML = losingMessage();
    window.alert( losingMessage() );
  }
}

function gameDraw(  ) {
  statusDisplay.innerHTML = drawMessage();
  window.alert( drawMessage() );
}

function handlePlayerStartTurn() {
  statusDisplay.innerHTML = currentPlayerTurn();
}

function handlePlayerEndTurn() {
  statusDisplay.innerHTML = currentPlayerNotTurn();
}

socket.on('updateGameCellTTT', ( cellInfo ) => {
  updateGameCell( cellInfo );
})

socket.on('updateGameBoardTTT', (gameBoard) => {
  updateGameBoard( gameBoard );
})

socket.on('gameWonTTT', (winnerId) => {
  gameWon( winnerId );
})

socket.on('gameDrawTTT', (arg) => {
  gameDraw( );
})

socket.on('playerTurnTTT', (arg) => {
  handlePlayerStartTurn();
})

socket.on('notTurnTTT', (arg) => {
  handlePlayerEndTurn();
})

socket.on('reject', (arg) => {
  window.location.href = "/rejectPage";
})

socket.on('returnToLobby', (arg) => {
  window.location.href = "../index.html";
})

createGameBoard();
