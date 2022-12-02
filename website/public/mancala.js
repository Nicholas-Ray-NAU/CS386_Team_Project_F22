var name = window.localStorage.getItem("name");
var roomID = window.localStorage.getItem("roomID");
var hashID = window.localStorage.getItem("hashID");

var socket = io();
socket.emit('rejoinRoomMancala', roomID);

//Listeners (on-click)
document.querySelector( '.game--restart' ).addEventListener(
                                                         'click', restartGame );


document.getElementById("chat-form").addEventListener("submit", handleChatSubmit
                                                              , false);

const GAMEBOARDCONTAINER = document.getElementById("game--container");
const GAMEBOARDSIZE = 14;
const PLAYERONEMANCALA = 6;
const PLAYERTWOMANCALA = 13;
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
let isPlayerOne = true;
var usernameValue = 'Default_User';   // REMOVE LATER TODO

function createGameBoard() {
  let index;

  const playerOneMancala = document.createElement("div");
  playerOneMancala.classList.add("mancala--cell");
  GAMEBOARDCONTAINER.append(playerOneMancala);

  const rowContainer = document.createElement("div");
  rowContainer.classList.add("rows--container");
  GAMEBOARDCONTAINER.appendChild(rowContainer);

  const rowOne = document.createElement("div");
  rowOne.classList.add("row--container");
  rowContainer.appendChild(rowOne);

  const rowTwo = document.createElement("div");
  rowTwo.classList.add("row--container");
  rowTwo.classList.add("row--container--two");
  rowContainer.appendChild(rowTwo);

  const playerTwoMancala = document.createElement("div");
  playerTwoMancala.classList.add("mancala--cell");
  GAMEBOARDCONTAINER.append(playerTwoMancala);


  // Creates GRIDSIZE amount of boxes for each row
  for(index = 0; index < PLAYERONEMANCALA; index++)
  {
      let cell = document.createElement("div");
      cell.addEventListener('click', handleCellClick)
      cell.setAttribute("data-cell-index", `${index}`)
      cell.classList.add("cell");
      gameBoard.push(cell);
      rowOne.appendChild(cell);
  }

  gameBoard.push(playerOneMancala);

  for(index = PLAYERONEMANCALA + 1; index < PLAYERTWOMANCALA; index++) {
    let cell = document.createElement("div");
    cell.setAttribute("data-cell-index", `${index}`)
    cell.classList.add("cell");
    gameBoard.push(cell);
    rowTwo.appendChild(cell);
  }
  gameBoard.push(playerTwoMancala);
}

function handleCellClick(clickedCellEvent) {
  //get clicked cell location
  let clickedCell = clickedCellEvent.target;
  let clickedCellIndex = parseInt( clickedCell.getAttribute(
                                                        'data-cell-index' ))

  if(!isPlayerOne) {
    clickedCellIndex += 7;
  }

  // Send event to server
  socket.emit('cellClickedMancala', clickedCellIndex)
}

function restartGame() {
  // Send restart command to server
  socket.emit('restartGameMancala', null)
  statusDisplay.innerHTML = ""
}

function updateGameBoard(updatedGameBoard) {
  if (isPlayerOne) {
    for(let index = 0; index < GAMEBOARDSIZE; index++) {
      gameBoard[index].textContent = updatedGameBoard[index];
    }
  }
  else {
    let reversedIndex = 7;
    for(let index = 0; index < GAMEBOARDSIZE; index++) {
      gameBoard[reversedIndex % GAMEBOARDSIZE].textContent = updatedGameBoard[index];
      reversedIndex++;
    }
  }
}

function gameWon(winnerId) {
  if(socket.id == winnerId) {
    statusDisplay.innerHTML = winningMessage();
    window.alert( winningMessage() );
  }
  else {
    statusDisplay.innerHTML = losingMessage();
    window.alert( losingMessage() );
  }
}

function gameDraw() {
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
          username: usernameValue,
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

function MessageAdd(messageData) {
    //locate chat box
    var chat_messages = document.getElementById("chat-messages");

    //append chat data to end of chat box
    chat_messages.insertAdjacentHTML("beforeend", messageData);
    chat_messages.scrollTop = chat_messages.scrollHeight;
}

socket.on('updateGameBoardMancala', (gameBoard) => {
  updateGameBoard( gameBoard );
})

socket.on('gameWonMancala', (winnerId) => {
  gameWon( winnerId );
})

socket.on('gameDrawMancala', (arg) => {
  gameDraw( );
})

socket.on('playerTurnMancala', (arg) => {
  handlePlayerStartTurn();
})

socket.on('notTurnMancala', (arg) => {
  handlePlayerEndTurn();
})

socket.on('playerAssignment', (playerAssignment) => {
  if(playerAssignment == 1) {
    isPlayerOne = true;
  }
  else {
    isPlayerOne = false;
  }
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
