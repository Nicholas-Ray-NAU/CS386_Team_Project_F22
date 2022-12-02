



document.querySelector(".Submit").onclick = function() {
	
	//get user data form text boxes
	let username = document.querySelector('.Username').value
	let password = document.querySelector('.Password').value
	
	//ini0tialize the user exists flag to false
	let userExists = false;
	
	//initialize the user data array for easy access to data
	const userData = [username, password];
	
	//check if user already exists
	fs.readFile('userData.txt', function(err, data){
		
		//loop through all users in data file
		for(let i=0; i < data.length; i++){
			
			//if the username exists, exit the loop
			if(username == data[i]//[index of username in data])
				
				userExists = true;
				break;
				
		}

		// if username is not taken check if password is correct
		if(userExists){
			
			//check if password is right
			if(password == data[i][1]){ //this is the password in the data file
			
				/* login stuff HERE 
				#######################################
				*/
					
				//send user to home page
				window.location.replace("/index.html");
			}
			
			//otherwise password is wrong and they have to redo it
			else{
				window.alert("ERROR: Password is incorrect");
			}
			
		}
		
		//otherwise the username doesnt exist
		else{
			window.alert("ERROR: Username not found");	
		}
		
		
	});
};




/*const fs = require('fs')

const SUBMIT_BUTTON = document.getElementsByClassName("Submit");

let firstName = document.getElementsByName('FirstName');
let lastName = document.getElementsByName('LastName'); 
let username = document.getElementsByName('Username');
let password = document.getElementsByName('Password');

const userData = firstName + ', ' + lastName + ', ' + userName + ', ' + password;


function signUp (userData) {
	fs.writeFile('userData.txt' userData, (err) =>{
		if (err) throw err;
	})
}

SUBMIT_BUTTON.addEventListener('click', signUp(userData));

	
const SUBMIT_BUTTON = document.getElementsByClassName("Submit");
SUBMIT_BUTTON.addEventListener('click', console.log("IT WORKS BIIIITCH"));



<script type="module" src="index.js"></script>
<script src="/socket.io/socket.io.js"></script>
*/