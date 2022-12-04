var socket = io()

//once button is pressed, check to see if hash is in the data file
document.querySelector(".Submit").onclick = function() {

	//get the user data they input
	let username = document.querySelector('.Username').value
	let password = document.querySelector('.Password').value

	//if anything enetered has a space, throw error
	if( /\s/.test(username) || /\s/.test(password) ){
		window.alert("Input Invalid: Entries cannot contain Spaces");
	}

	//username and password length test
	else if(username.length == 0 || password.length == 0){
		window.alert("Input Invalid: Entries cannot be empty");
	}

	//otherwise login and password are valid inputs and try to login
	else{
		socket.emit('loginAttempt', username, password);
	}
}


socket.on('loginAccepted', (...args) => {
	/* login stuff HERE
	#######################################
	*/
	// window.location.assign("/indexLoggedIn.html");
	window.location.assign("./index.html");
});

socket.on('passwordFailed', (arg) => {
	window.alert("The password entered is incorrect");
});

socket.on('userNonexistant', (arg) => {
	window.alert("There is no account with that username");
});