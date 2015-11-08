// Main entry point of the app. Load dependencies here
// paths property will work as fallback route, if a dependency could not be found in baseUrl
requirejs.config({
    paths: {
        q: [
            "../components/q/q"
        ],
        "q-xhr": [
            "../components/q-xhr/q-xhr"
        ]
    }
});

require(["canvas"], function(canvas) {
    "use strict";
    console.log("Canvas module loaded", canvas);
});
