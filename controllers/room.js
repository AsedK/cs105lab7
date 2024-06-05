const { Message, Room } = require('../models/chat');
const roomIdGenerator = require('../util/roomIdGenerator.js');

function getRoom(request, response) {
    const roomName = request.params.roomName;
    const roomID = request.params.roomID; // Assuming the unique ID is passed as a route parameter
    response.render('room', { title: 'chatroom', roomName, roomUniqueID: roomID });
}

function getMessages(request, response) {
    Message.find({ roomName: request.params.roomName }).then(messages => {
        response.json(messages);
    });
}

function postMessage(request, response) {
    const newMessage = new Message({
        roomName: request.params.roomName,
        nickname: request.body.nickname,
        body: request.body.body
    });
    newMessage.save().then(() => {
        response.status(201).json(newMessage);
    });
}

module.exports = {
    getRoom,
    getMessages,
    postMessage
};
