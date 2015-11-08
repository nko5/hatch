define(["wavesurfer"], function(WaveSurfer) {
    "use strict";
    var exports, wavesurfer, base64ToArrayBuffer;

    /**
     * Visualize audio input.
     *
     * @module player
     * @requires WaveSurfer
     */
    exports = {};

    wavesurfer = Object.create(WaveSurfer);

    wavesurfer.init({
        container: '#player',
        waveColor: 'blue',
        progressColor: 'blue'
    });

    wavesurfer.on('ready', function () {
        wavesurfer.play();
    });

    /**
     * Converts a base64 string to Uint8Array
     *
     * @private
     * @param {String} base64 - base64 representation of an object.
     * @returns {Uint8Array} buffer - Uint8Array representation of that object.
     */
    base64ToArrayBuffer = function(base64) {
        var binaryString, i, len, bytes;

        binaryString = window.atob(base64);
        len = binaryString.length;
        bytes = new Uint8Array(len);

        for (i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes.buffer;
    };

    /**
     * Deal with directly uploaded audio by feeding it into WaveSurfer.
     *
     * @param {(File|Blob)} blob - Uploaded file.
     */
    exports.loadFromBlob = function(blob) {
        wavesurfer.loadBlob(blob);
    };

    /**
     * Deal with base64 encoded audio by processing it for WaveSurfer.
     *
     * @param {String} base64 - base64 representation of an object.
     */
    exports.loadFromBase64 = function(base64) {
        var arrayBuffer;

        // base64 = "data:audio/mp3;base64," + base64;
        arrayBuffer = base64ToArrayBuffer(base64);
        wavesurfer.loadArrayBuffer(arrayBuffer);
        //wavesurfer.load('../sound.mp3');
    };

    document.querySelector('#play_stop').addEventListener('click', wavesurfer.playPause.bind(wavesurfer));

    return exports;
});
