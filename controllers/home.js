const { Room } = require('../models/chat');
const roomIdGenerator = require('../util/roomIdGenerator');

function getHome(request, response) {
    Room.find().then(rooms => {
        const roomNames = rooms.map(room => room.id); // Extract room IDs
        response.render('home', { title: 'home', roomNames });
    }).catch(err => {
        console.error('Error fetching rooms:', err);
        response.status(500).send('Internal Server Error');
    });
}

function createRoom(request, response) {
    const roomName = roomIdGenerator(); // Generate UniqueID
    const newRoom = new Room({ name: roomName, id: roomName });
    newRoom.save().then(() => {
        response.redirect(`/${roomName}`); // Redirect to the unique ID route
    });
}

module.exports = {
    getHome,
    createRoom
};
