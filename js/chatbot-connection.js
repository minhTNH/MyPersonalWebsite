const sendButton = document.querySelector(".send");
const chatBox = document.querySelector("#myForm");
const input = document.querySelector(".text-input");
const messages = document.querySelector(".messages");
const robotImg = document.querySelector(".robot_img");

const WELCOME_API = 'http://127.0.0.1:5000/api/welcome';
const MESSAGES_API = 'http://127.0.0.1:5000/api/messages';
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
            let last_time = "";
            resp.data.forEach(function(msg) {
                if (msg.created_date != undefined) {
                    let tmpDate = new Date(msg.created_date);
                    last_time = tmpDate.toLocaleString();
                    console.log("last_time 1: " + last_time);
                } else {
                    console.log("last_time 2: " + last_time);
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
        })
        .catch(resp=>{
            displayChatbot("Cheri", "Because of the laziness of my boss. I am temporarily out of service|Please come back later!!");
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
                let last_time = "";
                console.log("Im in Interval response API");
                resp.data.forEach(function(msg) {
                    if (msg.created_date != undefined) {
                        let tmpDate = new Date(msg.created_date);
                        last_time = tmpDate.toLocaleString();
                        console.log("last_time 1: " + last_time);
                    } else {
                        console.log("last_time 2: " + last_time);
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
            })
        }
    },
    3000);


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
        repuest = {
          user_id: user.user_id,
          request: user_input
        };
        getAPIResponse(RESPONSE_API, repuest)
        .then(resp=> {
            if (resp.username != "" && user.username != resp.username) {
                user.username = resp.username;
                addCookie("username", resp.username);
            }
            displayChatbot("Cheri", resp.data);
        })
    }
    input.value = "";
    return false;
}

// Display user's messages
// Called from function sendMessage()
function displayGuest(name, msg) {
    messages.innerHTML += "<div class='msg-container darker'>" +
                      "<span class='message'>" + msg + "</span>" +
                      "<span class='username right'>" + name + "</span>" +
                      "</div>";
    messages.scrollTop = messages.scrollHeight;
}

// Display chatbot's messages
// Called from function sendMessage()
function displayChatbot(name, msg) {
    if (!msg.includes("|")) {
        messages.innerHTML += "<div class='msg-container'>" +
            "<span class='username'>" + name + "</span>" +
            "<span class='message'>" + msg + "</span>" +
            "</div>";
    } else {
        let sentences = msg.split("|");
        for (i in sentences) {
            messages.innerHTML += "<div class='msg-container'>" +
                "<span class='username'>" + name + "</span>" +
                "<span class='message'>" + sentences[i] + "</span>" +
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
    console.log("Cookie: " + key + " = " + default_value);
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
    console.log("User id: " + user_id);
    return user_id;
}

// Wait for connecting web socket to server
function waitForSocketConnection(_socket, callback) {
    setTimeout(
        function(){
            // Check web socket connection
            if (_socket.readyState === 1) {
                console.log('Connected to chat socket')
                if (callback != null) {
                    callback()
                }
            } else {
                console.log('Wait for connection...')
                waitForSocketConnection(_socket, callback)
            }
        }, 300)
}

//waitForSocketConnection(
//    socket,
//    // Join room
//    () => {socket.send(JSON.stringify({
//        "command": "join",
//        "username": "Minh",
//    }))}
//)
