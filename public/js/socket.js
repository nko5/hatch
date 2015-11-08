define(["socketio", "player"], function(io, player) {
    "use strict";
    var exports, url, socket;

    exports = {};
    console.log("Socket loaded", io, player);
    url = window.location.protocol + "//" + window.location.hostname + ":4343";

    socket = io.connect(url);
    socket.on("news", function(data) {
        console.log("news:", data);
        player.loadFromBase64(data);
    });

    return exports;
});
