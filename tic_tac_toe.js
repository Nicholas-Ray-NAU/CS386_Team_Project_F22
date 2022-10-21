//Global Constants
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

const statusDisplay = document.querySelector('.game--status');
const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

//Global Variables
let gameActive = true;
let currentPlayer = "X";
let gameBoard = [ "", "", "", "", "", "", "", "", "" ];

//Listeners (on-click)
document.querySelectorAll( '.cell' ).forEach(
                    cell => cell.addEventListener ('click', handleCellClick ) );
document.querySelector( '.game--restart' ).addEventListener( 
                                                         'click', restartGame );

function checkForGameOver() {
    
    //initialize variables
    let roundWon = false;
    let index = 0;
    let roundDraw = !gameBoard.includes( "" );
    
    //check for not round draw
    if( !roundDraw ) {
        
        //begin loop to test win conditions
        while( index <= 7 && !roundWon ) {
            
            //load win condition at current index for testing
            const winCondition = winningConditions[ index ];
            
            //load testing variables at index of possible win condition
            let cell1 = gameBoard[ winCondition[ 0 ] ];
            let cell2 = gameBoard[ winCondition[ 1 ] ];
            let cell3 = gameBoard[ winCondition[ 2 ] ];
            
            //check for empty cell
            if ( cell1 === '' || cell2 === '' || cell3 === '' ) {
                
                //increment index
                index++;
                
                //continue loop
                continue;
            }
            //otherwise, assume all cells populated
            
            //check for win condition (all cells equal)
            if ( cell1 === cell2 && cell2 === cell3 ) {
                
                //set win flag to true
                roundWon = true;
                
            }
            
            //increment index
            index++;
        }
        //end testing loop
        
        //check for round won flag
        if ( roundWon ) {
            
            //set game active flag to false
            gameActive = false;
          
            //display win message
            statusDisplay.innerHTML = winningMessage();
            window.alert( winningMessage() );
            
            //return
            return;
        }
        //otherwise, assume no winner
        
        //change players
        handlePlayerChange();
    
    }
    //otherwise, assume round ended in a draw
    else {
        
        //set game active flag to false
        gameActive = false;
        
        //display draw message
        statusDisplay.innerHTML = drawMessage();
        window.alert( drawMessage() );
        
        //return
        return;
        
    }
    
}

function handlePlayerChange() {
    
    //check for current player 'X'
    if( currentPlayer === "X" ) {
        
        //set current player to 'O'
        currentPlayer = "O"
    }
    //otherwise, assume player 'O'
    else {
        
        //set current player to 'X'
        currentPlayer = "X"
    }
    
    //display current users' turn
    statusDisplay.innerHTML = currentPlayerTurn();
}

function handleCellClick( clickedCellEvent ) {
    
    //get clicked cell location
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt( clickedCell.getAttribute(
                                                          'data-cell-index' ) );
    
    //test Cell not currently used
    if ( !gameActive || gameBoard[clickedCellIndex] !== "" ) {
        
        //return out of function
        return;
    }
    //otherwwise, assume proper click
    
    //handle clicked cell
    handleCellPlayed( clickedCell, clickedCellIndex );
    
    //check for end of game
    checkForGameOver();
}

function handleCellPlayed( clickedCell, clickedCellIndex ) {
    
    //set clicked cell to curernt players character
    gameBoard[ clickedCellIndex ] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
    
}


function restartGame() {
    
    //reset all game varaibles
    gameActive = true;
    currentPlayer = "X";
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
    
}
