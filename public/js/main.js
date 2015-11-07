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
          '../components/wavesurfer.js/dist/wavesurfer.min'
        ]
    }
});

require(["canvas"], function(canvas) {
    "use strict";
    console.log("Canvas module loaded", canvas);
});

require(["player"], function(player) {
    "use strict";
    console.log("Player module loaded", player);
});
