const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    roomName: String,
    nickname: String,
    body: String,
    datetime: { type: Date, default: Date.now }
});

const roomSchema = new mongoose.Schema({
    name: String,
    id: String
});

const Message = mongoose.model('Message', messageSchema);
const Room = mongoose.model('Room', roomSchema);

module.exports = { Message, Room };
