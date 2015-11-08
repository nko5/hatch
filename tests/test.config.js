requirejs.config({
    baseUrl: 'js',
    paths: {
        "chai": [
            "../tests/lib/chai"
        ],
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

require([
    "./tests/specs/test.canvas.js"
], function() {
    mocha.run();
});
