typeof document !== "undefined" && document.addEventListener("DOMContentLoaded", function() {
	var socket = io()

	//once button is pressed, check to see if hash is in the data file
	document.querySelector(".Submit").onclick = function () {

		//get the user data they input
		let username = document.querySelector('.Username').value
		let password = document.querySelector('.Password').value

		//if anything enetered has a space, throw error
		if (loginFail(username, password)) {
			window.alert("Input Invalid: Entries cannot contain Spaces");
		}

		//username and password length test
		else if (loginFailEmpty(username, password)) {
			window.alert("Input Invalid: Entries cannot be empty");
		}

		//otherwise login and password are valid inputs and try to login
		else {
			socket.emit('loginAttempt', username, password);
		}
	}

	socket.on('loginAccepted', (...args) => {
		window.localStorage.setItem("username", args[0]);
		window.localStorage.setItem("name", args[1]);
		window.localStorage.setItem("loggedIn", true);
		window.location.replace("./indexLoggedIn.html");

	});

	socket.on('passwordFailed', (arg) => {
		window.alert("The password entered is incorrect");
	});

	socket.on('userNonexistant', (arg) => {
		window.alert("There is no account with that username");
	});

});


function loginFail(username, password) {
	return /\s/.test(username) || /\s/.test(password);
}

function loginFailEmpty(username, password) {
	return username.length === 0 || password.length === 0;
}

exports.loginFail = loginFail;
exports.loginFailEmpty= loginFailEmpty;
