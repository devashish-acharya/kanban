const chatForm = document.getElementById('chat-form')
const chatMessages = document.querySelector('.chat-messages')
const roomName = document.getElementById('room-name')
const userList = document.getElementById('users')

//getting username and chatroom

const {username, room} = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});

const socket = io();


//joining the chatroom
socket.emit('joinRoom', {username, room})

// Get room plus users
socket.on('roomUsers', ({room, users}) => {
    outputRoomName(room);
    outputUsers(users)
})

//Getting message from server
socket.on('message', message => {
    console.log(message);
    outputMessage(message);

    //scroll functionality
    chatMessages.scrollTop = chatMessages.scrollHeight
  
});

//Submitting message
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const msg = e.target.elements.msg.value;

    socket.emit('chatMessage', msg)

    e.target.elements.msg.value = ''
    e.target.elements.msg.focus();
})

//using Dom to send message
function outputMessage(message) {
    const div = document.createElement('div')
    div.classList.add('message');
    div.innerHTML = `<p class="meta">${message.username}<span>${message.time}</span></p>
    <p class="text">
        ${message.text}
    </p>`;
    document.querySelector('.chat-messages').appendChild(div);
}

// Adding room name Dom
function outputRoomName(room) {
    roomName.innerText = room;
}

//adding user name DOM
function outputUsers (users) {
    userList.innerHTML = `
    ${users.map(user => `<li>${user.username}</li>`).join('')}
    `
}