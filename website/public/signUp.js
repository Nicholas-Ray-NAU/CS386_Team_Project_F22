var socket = io()

document.querySelector(".Submit").onclick = function() {
	
	//get all of the user data from the text boxes
	let firstName = document.querySelector('.FirstName').value
	let lastName = document.querySelector('.LastName').value
	let username = document.querySelector('.UsernameSU').value
	let password = document.querySelector('.PasswordSU').value
	
	//if anything entered has a space, throw error
	if( /\s/.test(username)||/\s/.test(password)||/\s/.test(firstName)||/\s/.test(lastName) ){
		window.alert("Input Invalid: Entries cannot contain Spaces");	
	}
	
	//entry length test
	else if(username.length == 0||password.length == 0||firstName.length==0||lastName.length==0){
		window.alert("Input Invalid: Entries cannot be empty");	
	}
	
	//otherwise all entries are valid inputs and try to sign up
	else{
		socket.emit('signupAttempt', username, firstName, lastName, password);
	}
	
}

socket.on('signupSuccess', (arg) => {
	//go to login page
	window.location.replace("/login.html");
	
});

socket.on('usernameTaken', (arg) => {	
	window.alert("Username is already taken");
});