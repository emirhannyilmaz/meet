var app = require('express')();
var http = require('http').createServer(app);
var cors = require('cors');
var io = require('socket.io')();
var availableRooms = [];

app.use(cors());

io.on('connection', (socket) => {
    console.log('user connected ' + socket.id);
    var connectedRoomId = null;

    socket.on('match', (user) => {
        if (availableRooms.length == 0) {
            socket.join(socket.id);
            availableRooms.push({
                id: socket.id,
                creator: user
            });
            connectedRoomId = socket.id;
        } else {
            var random = Math.floor(Math.random() * availableRooms.length);
            socket.join(availableRooms[random].id);
            socket.emit('joinedToRoom', availableRooms[random].creator);
            socket.to(availableRooms[random].id).emit('userJoined', user);
            connectedRoomId = availableRooms[random].id;
            availableRooms.splice(random, 1);
        }
    });

    socket.on('message', (data) => {
        socket.to(connectedRoomId).emit('message', data.message);
    });

    socket.on('leaveRoom', () => {
        socket.leave(connectedRoomId);
        socket.to(connectedRoomId).emit('partnerDisconnected');
        socket.emit('leftFromRoom');
        availableRooms.forEach(room => {
            if (room.id === connectedRoomId) {
                availableRooms.splice(room, 1);
            }
        });
        connectedRoomId = null;
    });

    socket.on('disconnect', () => {
        console.log('user disconnected ' + socket.id);
        if (connectedRoomId !== null) {
            socket.to(connectedRoomId).emit('partnerDisconnected');
            availableRooms.forEach(room => {
                if (room.id === connectedRoomId) {
                    availableRooms.splice(room, 1);
                }
            });
        }
    });
});

http.listen(process.env.PORT || 3000, () => {
    console.log('Server has started.');
});