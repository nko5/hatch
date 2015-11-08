define(["player"], function(player) {
    "use strict";
    var exports;

    /**
     * Feeds wavesurfer with data.
     *
     * @module audio
     * @requires player
     */
    exports = {};

    /**
     * Processes the audio file.
     *
     * @param {ImageData} file - The file to process.
     */
    exports.processAudio = function(file) {
        player.loadFromBlob(file);
    };

    return exports;
});
