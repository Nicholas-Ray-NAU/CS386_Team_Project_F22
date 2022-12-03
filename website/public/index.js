var socket = io()

const default_username = 'default';

window.localStorage.setItem("username", default_username);
let capturedMessage = '';

document.getElementById( 'joinTTT' ).addEventListener(
                                          'click', sendJoinMessageTTT );
document.getElementById( 'joinMancala' ).addEventListener(
                                          'click', sendJoinMessageMancala );

const loading = document.getElementById( 'loading' )

function sendJoinMessageTTT() {
    
    //check if username is set to default
    if( window.localStorage.username == default_username )
        {
        
        //prompt for a username
        let username = prompt("Please Enter A Username", "Player");
        
        //check for failure to set username
        if( username == null )
            {
            
            //begin input loop to force username
            do
                {
                
                //update username to new input
                username = prompt("Please Enter A Username", "Player");

                }
            while( username == null );
            //end username loop
            
            }
        
        //assume proper input, set username value
        window.localStorage.setItem("username", username);
        }
   
  loading.classList.remove("loading-off");
  loading.classList.add("loading-on");
  console.log("Waiting for second client...");
  socket.emit("joinTicTacToeQueue", "");
}

function sendJoinMessageMancala() {
    //check if username is set to default
    if( window.localStorage.username == default_username )
        {
        
        //prompt for a username
        let username = prompt("Please Enter A Username", "Player");
        
        //check for failure to set username
        if( username == null )
            {
            
            //begin input loop to force username
            do
                {
                
                //update username to new input
                username = prompt("Please Enter A Username", "Player");

                }
            while( username == null );
            //end username loop
            
            }
        
        //assume proper input, set username value
        window.localStorage.setItem("username", username);
        }
  loading.classList.remove("loading-off");
  loading.classList.add("loading-on");
  socket.emit("joinMancalaQueue", "");
}

// Listeners
socket.on('moveToTicTacToe', (arg) => {
  window.location.href = "ticTacToe.html";
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
