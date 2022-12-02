var fs = require("./fs");


document.querySelector(".Submit").onclick = function() {
	
	//get all of the user data from the text boxes
	let firstName = document.querySelector('.FirstName').value
	let lastName = document.querySelector('.LastName').value
	let username = document.querySelector('.UsernameSU').value
	let password = document.querySelector('.PasswordSU').value
	let userData = firstName + ', ' + lastName + ', ' + username + ', ' + password;

	//const array ;
	
	for (let i=0; i < array.length; i++){
		console.log(array[i]);
	}
	
}
/*
	//initialize the username taken flag to false
	let taken = false;
	
	//check if user already exists
	fs.readFile('userData.txt', function(err, data){
		
		//loop through all users in data file
		for(i in data){
			
			//if the username is already in the data file
			if(username == data[i]//[index of username in data])
				
				window.alert("ERROR: Username already taken");
				taken = true;
				break;
				
		}

		// if username not taken, write their user data to data file
		if(!taken){
			
			//write user data into file, making them an account
			fs.writeFile('userData.txt', userData);
			
			//send user to login page
			window.location.replace("/login.html");
		}
		
	});
};
/*
let fileString = fs.readFilesync('userData.txt').toString();
const characterArray = fileString.split("");

// read in user input for password
let password = document.getElementById("Password").value;
let password = password.toString()

// Write user data into file
characterArray[characterArray.length] = password + '\n';


fileString = characterArray.join("");
fs.writeFileSync("userData.txt", fileString);


function hashFunction(password){
   let hashValue = 0;
   const passwordArray = password.split("");

   for( let i = 0; i < passwordArray.length; i++ ){
      hashValue += passwordArray[i].charCodeAt(0);
      hashValue *= passwordArray[i].charCodeAt(0);
   }

   hashValue %= 1000;

   return hashValue;
}

function checkForUser(password, characterArray){
   let hashValue = hashFunction(password);
   let lineNumber = 1;
   let currentVal = 0;

   for( let i = 0; characterArray[i] != ','; i++ ){
         currentVal += parsenInt(characterArray[i])
      }
   if( currentVal == hashValue )
      {
         return true;
      }

   for( let i = 0; i < charracterArray.length; i++ ){

      if( characterArray[i-1] === '\n' )
         {
            currentVal = 0;
            for( ; characterArray[i] != ','; i++ ){
                  currentVal += parsenInt(characterArray[i])
               }
            if( currentVal == hashValue )
               {
                  return true;
               }
         }
   }

   return false;

}
*/