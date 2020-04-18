const sendButton = document.querySelector(".send");
const chatBox = document.querySelector("#myForm");
const input = document.querySelector(".text-input");
const messages = document.querySelector(".messages");
const robotImg = document.querySelector(".robot_img");

const WELCOME_API = 'http://127.0.0.1:5000/api/welcome';
// const MESSAGES_API = 'http://127.0.0.1:5000/api/messages';
const RESPONSE_API = 'http://127.0.0.1:5000/api/response';
const USERNAME_API = 'http://127.0.0.1:5000/api/username';
const DELUSER_API = 'http://127.0.0.1:5000/api/remove_username';

const SMILE = "smile"
const ERROR = "error"

let server_error = false;
let images = {
    smile: "image/Smiling-robot.jpg",
    error: "image/Error-robot.jpg"
}

user_id = addCookieUser();
username = getCookieUser("username", "Guest");
existed = getCookieUser("existed", "False");
let user = new User(user_id, username, existed);

// Chatbot welcomes a user when he/she enter the website
window.addEventListener(
    'load',
    function() {
        request = {
            user_id: user.user_id,
            username: user.username,
            existed: user.existed
        };
        getAPIResponse(WELCOME_API, request)
        .then(resp=> {
            displayWelcome(resp.data);
        })
        .catch(resp=>{
            displayChatbot("Cheri", "Because of the laziness of my boss. I am temporarily out of service|Please come back later!!");
            displayGuest("Minh", "I have tried my best, Cheri");
            displayChatbot("Cheri", "Please try harder, Sir");
            updateRobotImg(ERROR);
            sendButton.disabled = true;
            server_error = true;
        })
});

setInterval(
    function(){
        if (server_error) {
            getAPIResponse(WELCOME_API, request)
            .then(resp=> {
                server_error = false;
                displayWelcome(resp.data);
            })
        }
    }, 3000);

// function used for WELCOME_API
function displayWelcome(data) {
    let last_time = "";
    data.forEach(function(msg) {
        if (msg.created_date != undefined) {
            let tmpDate = new Date(msg.created_date);
            last_time = tmpDate.toLocaleString();
        } else {
            messages.innerHTML += "<div class='msg-container text-muted'>" +
            "<span class='message'>" + last_time + "</span>" +
            "</div>";
        }
        if (msg.is_user) {
            displayGuest(msg.name, msg.content);
        } else {
            displayChatbot(msg.name, msg.content);
            updateRobotImg(SMILE);
        }
    })
}

// Click Send button to send message
sendButton.addEventListener(
    'click',
    function(){sendMessage();},
    false);

// Enter to send message
input.addEventListener(
    'keypress',
    function(e) {
        if(e.which == 13 && !e.shiftKey) {
            sendMessage();
            e.preventDefault();
        }
    },
    false);

//Send user input to chatbot server and display messages
// Called from clicking "Send" button or pressing "Enter"
function sendMessage() {
    let user_input = input.value.trim();
    if (user_input != "") {
        displayGuest(user.username, user_input);
        request = {
          user_id: user.user_id,
          request: user_input
        };
        getAPIResponse(RESPONSE_API, request)
        .then(resp=> {
            if (resp.status_code == 200) {
                if (resp.username != "" && user.username != resp.username) {
                    user.username = resp.username;
                    addCookie("username", resp.username);
                }
                displayChatbot("Cheri", resp.data);
            }
        })
        .catch(resp=>{
            displayChatbot("Cheri", "Sorry! Some problems happened with my server|I cannot talk with you any longer|Please come next time");
            updateRobotImg(ERROR);
            sendButton.disabled = true;
        })
    }
    input.value = "";
    return false;
}

// Display user's messages
// Called from function sendMessage()
function displayGuest(name, msg) {
    messages.innerHTML += "<div class='msg-container darker'>" +
                      "<div class='message col-md-10'>" + msg + "</div>" +
                      "<div class='username col-md-2 right'>" + name + "</div>" +
                      "</div>";
    messages.scrollTop = messages.scrollHeight;
}

// Display chatbot's messages
// Called from function sendMessage()
function displayChatbot(name, msg) {
    if (!msg.includes("|")) {
        messages.innerHTML += "<div class='msg-container'>" +
            "<div class='username col-md-2'>" + name + "</div>" +
            "<div class='message col-md-10'>" + msg + "</div>" +
            "</div>";
    } else {
        let sentences = msg.split("|");
        for (i in sentences) {
            messages.innerHTML += "<div class='msg-container'>" +
                "<div class='username col-md-2'>" + name + "</div>" +
                "<div class='message col-md-10'>" + sentences[i] + "</div>" +
                "</div>";
        }
    }
    messages.scrollTop = messages.scrollHeight;
}

function updateRobotImg(emotion) {
    robotImg.src = images[emotion];
}

// Receive response from chatbot server
// Called from function sendMessage()
async function getAPIResponse(api, data) {
  let response = await fetch(api, {
    headers:{
      "content-type":"application/json"
    },
    body:JSON.stringify(data),
    method:"POST"
  });
  let resp = await response.json();
  return resp;
}

// Create User object
function User(user_id, username, existed) {
    this.user_id = user_id;
    this.username = username;
    this.existed = existed;
}

//-----------------Cookie----------------------------
// Add keys and values to cookie
function addCookie(key, value, expire_days) {

    let expire_date = new Date();
    expire_date.setTime(expire_date.getTime() + (expire_days*24*60*60*1000));
    let expires = "expires=" + expire_date.toUTCString();

    console.log("Add Cookie: " + key + "=" + value + ";" + expires + ";path=/")
    document.cookie = key + "=" + value + ";" + expires + ";path=/";
}

// Get Cookie by key, set default value if key is not existed
function getCookieUser(key, default_value){
    let edited_key = key + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let objects = decodedCookie.split(';');
    for (let i = 0; i < objects.length; i++) {
        obj = objects[i];
        while (obj.charAt(0)==' ') {
            obj = obj.substring(1);
        }
        if (obj.indexOf(edited_key) == 0) {
            let value = obj.substring(edited_key.length, obj.length)
            console.log("Cookie: " + key + " = " + value);
            return value;
        }
    }
    return default_value;
}

// Get User ID from cookie or create a new one
function addCookieUser(){
    let user_id = getCookieUser("user_id", "");
    if (user_id == "") {
        user_id = String(Date.now());
        addCookie("user_id", user_id, 7);
        addCookie("username", "Guest", 7);
        addCookie("existed", "False", 7);
    } else {
        addCookie("existed", "True", 7);
    }
    return user_id;
}
