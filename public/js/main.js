// Main entry point of the app. Load dependencies here
// paths property will work as fallback route, if a dependency could not be found in baseUrl
requirejs.config({
    paths: {
        q: [
            "../components/q/q"
        ],
        "q-xhr": [
            "../components/q-xhr/q-xhr"
        ],
        wavesurfer: [
          '../components/wavesurfer/wavesurfer.amd'
        ]
    }
});

require(["upload", "player"], function(upload, player) {
    "use strict";
    console.log("Upload module loaded", upload);
    console.log("Player module loaded", player);
});
