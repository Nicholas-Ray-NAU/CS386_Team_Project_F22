var socket = io()

const ERROR_USERNAME = 'ERROR';
const ERROR_TYPE = 'error';
const MESSAGE_TYPE = 'message';

/*----------DEFAULT DATA FOR TESTING ONLY----------*/
var usernameValue = 'Default_User';
/*----------DEFAULT DATA FOR TESTING ONLY----------*/

/*----------CAPTURE URL DATA FUNCTION----------*/
/*Assuming formatting as "*URL*?h='userHash'&u='userName'"*/
/* NEEDS TESTING!
function getUsername (){
    
    //variable declaration
    var hashKey = 'h';
    var usernameKey = 'u'
    
    //capture url and parse data
    let rawURL = window.location.href.toString();
    let parameterString = rawURL.split('?')[1];
    let parameters = parameterString.split('&');
    
    //parse first key/value pair (hash value)
    if(parameters[0].split('=')[0] == hashKey){
        let hashValue = parameters[0].split('=')[1];
    }
    else{
        let hashValue = "undefined";
    }
    
    //parse the second key/value pair (username value)
    if(parameters[1].split('=')[0] == usernameKey){
        let usernameValue = parameters[1].split('=')[1];
    }
    else{
        usernameValue = "undefined";
    }
    
}
*/
/*---------- END CAPTURE URL DATA FUNCTION----------*/

document.getElementById("chat-form").addEventListener("submit", function(event) {
    event.preventDefault();
    
    //capture chat string
    var capturedMessage = document.getElementsByTagName("input")[0];
    var rawMessage = message_element.value;
    
    //If the string was captured, format it for sending
    if (message.toString().length > 0) {
        var messageData = {
            type: MESSAGE_TYPE,
            username: usernameValue,
            message: message
        }
    //otherwise, assume failure to capture
    else{
        
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
}, false);

/*----------SERVER.JS----------*/
/*
const ERROR_USERNAME = 'ERROR';
const ERROR_TYPE = 'error';
const MESSAGE_TYPE = 'message';
*/
  socket.on('sendChatMsg', (messageData) => {
    if messageData.type == ERROR_TYPE{
        console.log(messageData.username + ': ' + messageData.message);
    }
    
    if messageData.type == MESSAGE_TYPE
    MessageAdd('<div class="message">' + messageData.username + ': ' + messageData.message + '</div>')
  })

function MessageAdd(messageData) {
    //locate chat box
    var chat_messages = document.getElementById("chat-messages");
    
    //append chat data to end of chat box
    chat_messages.insertAdjacentHTML("beforeend", messageData);
    chat_messages.scrollTop = chat_messages.scrollHeight;
}

/*----------END SERVER.JS----------*/