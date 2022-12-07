
var name =  window.localStorage.getItem("name");
var username =  window.localStorage.getItem("username");
var roomID = window.localStorage.getItem("roomID");
var hashID = window.localStorage.getItem("hashID");

var socket = io();
socket.emit('rejoinRoomTTT', roomID);

//Listeners (on-click)
document.querySelector( '.game--restart' ).addEventListener(
                                                         'click', restartGame );

document.getElementById("chat-form").addEventListener("submit", handleChatSubmit
                                                             , false);

const GAMEBOARDCONTAINER = document.getElementById("game--container");
const GAMEBOARDSIZE = 9;
const ERROR_USERNAME = 'ERROR';
const ERROR_TYPE = 'error';
const MESSAGE_TYPE = 'message';

const statusDisplay = document.querySelector('.game--status');
const winningMessage = () => `You won!`;
const losingMessage = () => `You lost!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's your turn`;
const currentPlayerNotTurn = () => `It's not your turn`;

let gameBoard = [];

// Check if user is logged in
if(window.localStorage.getItem("loggedIn")) {
  document.getElementById("index-link").href = "indexLoggedIn.html"
}

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

function handleChatSubmit(event) {
  event.preventDefault();

  //capture chat string
  var capturedMessage = document.getElementById("chat-input");
  var rawMessage = capturedMessage.value;

  //If the string was captured, format it for sending
  if (rawMessage.toString().length > 0) {
      var messageData = {
          type: MESSAGE_TYPE,
          username: username,
          message: rawMessage
      }
  }
  //otherwise, assume failure to capture115
  else {

      //format error message
      var messageData = {
          type: ERROR_TYPE,
          username: ERROR_USERNAME,
          message: "Failed to capture chat message"
      }


  }

  //send message data to be handled by server
  socket.emit("sendChatMsg", messageData)

  //clear captured message
  capturedMessage.value = "";
}

// Adds chat message to chat div
function MessageAdd(messageData) {
    //locate chat box
    var chat_messages = document.getElementById("chat-messages");

    //append chat data to end of chat box
    chat_messages.insertAdjacentHTML("beforeend", messageData);
    chat_messages.scrollTop = chat_messages.scrollHeight;
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

socket.on('sendChatMsg', (messageData) => {
  // For debugging
  if (messageData.type == ERROR_TYPE){
      console.log(messageData.username + ': ' + messageData.message);
  }

  if (messageData.type == MESSAGE_TYPE){
    MessageAdd('<div class="message">' + messageData.username + ': '
    + messageData.message + '</div>')
  }
})

createGameBoard();
