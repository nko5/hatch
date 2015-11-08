requirejs.config({
    baseUrl: 'js',
    paths: {
        chai: [
            "../tests/lib/chai"
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
    "./tests/specs/test.canvas.js"
], function() {
    mocha.run();
});
