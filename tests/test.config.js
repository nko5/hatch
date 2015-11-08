requirejs.config({
    baseUrl: 'js',
    paths: {
        chai: [
            "../tests/lib/chai"
        ],
        "chai-as-promised": [
            "../tests/lib/chai-as-promised"
        ],
        testHelper: [
            "../tests/lib/testHelper"
        ],
        q: [
            "../components/q/q"
        ],
        "q-xhr": [
            "../components/q-xhr/q-xhr"
        ],
        sinon: [
            "../tests/lib/sinon"
        ],
        "sinon-chai": [
            "../tests/lib/sinon-chai"
        ],
        Squire: [
            "../tests/lib/Squire"
        ],
        wavesurfer: [
          '../components/wavesurfer/wavesurfer.amd'
        ]
    }
});

// require([specs], kick_off_mocha)
require([
    "./tests/specs/test.audio.js",
    "./tests/specs/test.backend.js",
    "./tests/specs/test.canvas.js",
    "./tests/specs/test.player.js",
    "./tests/specs/test.upload.js"
], function() {
    mocha.run();
});
