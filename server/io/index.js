'use strict';
var socketio = require('socket.io');
var io = null;

module.exports = function (server) {

    if (io) return io;

    io = socketio(server);

    io.on('connection', function (socket) {

        socket.on('phone:newNote', function(note) {
            socket.broadcast.emit('note:change', note)
        });

        //socket.on('disconnect', function() {
            //console.log('disconnected')
            //socket.broadcast.emit('disconnect:phone');
        //});

    });

    return io;

};
