// Main entry point of the app. Load dependencies here
// paths property will work as fallback route, if a dependency could not be found in baseUrl
requirejs.config({
    paths: {
        'q': [
            "lib/q"
        ],
        'q-xhr': [
            "lib/q-xhr"
        ],
        'wavesurfer': [
          '../components/wavesurfer/wavesurfer.amd'
        ]
    }
});

require(["canvas", "player"], function(canvas, player) {
    "use strict";
    console.log("Canvas module loaded", canvas);
    console.log("Player module loaded", player);
});
