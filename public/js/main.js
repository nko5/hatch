// Main entry point of the app. Load dependencies here
// paths property will work as fallback route, if a dependency could not be found in baseUrl
requirejs.config({
    paths: {
        q: [
            "../components/q/q"
        ],
        socketio: [
            "../components/socket/socket.io"
        ],
        "q-xhr": [
            "../components/q-xhr/q-xhr"
        ],
        wavesurfer: [
          '../components/wavesurfer/wavesurfer.amd'
        ]
    },
    shim: {
        socketio: {
            exports: 'io'
        }
    }
});

require(["upload", "socket"], function(upload, socket) {
    "use strict";
    console.log("Upload module loaded", upload);
});
