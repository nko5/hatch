define(["wavesurfer"], function(WaveSurfer) {
    "use strict";
    var exports, wavesurfer, base64ToArrayBuffer, prepareAudioContext;

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
        document.getElementById("wait").style.display = "none"
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

    prepareAudioContext = function(arrayBuffer) {
        var oscillator, gain, source, context, audioBuffer, buffer;
        
        context = new AudioContext();
        oscillator = context.createOscillator();
        gain = context.createGain();
        oscillator.connect(gain);
        gain.connect(context.destination);
        oscillator.type = 'sine';
        oscillator.frequency.value = 2500;
        var step = 0;
        var loop = setInterval(function() {
            console.log(arrayBuffer[step]);
            var value = Math.random() * 2000;
            oscillator.frequency.value = value;
            if (step >= arrayBuffer.length) {
                clearInterval(loop);
            }
        }, 100);
        oscillator.start();

        audioBuffer = arrayBuffer;
        console.log(context, audioBuffer);
        // source is global so we can call .noteOff() later.
        buffer = audioBuffer.buffer || context.createBuffer(2, context.sampleRate * 2.0, context.sampleRate);

        console.log("Buffer", buffer);
        source = context.createBufferSource();
        source.buffer = buffer;
        source.loop = true;
        source.connect(context.destination);
        source.start(); // Play immediately.
        console.log(source);
        return source;
    };

    /**
     * Deal with directly uploaded audio by feeding it into WaveSurfer.
     *
     * @param {(File|Blob)} blob - Uploaded file.
     */
    exports.loadFromBlob = function(blob) {
        var reader = new FileReader();
        console.log(blob, reader);
        reader.onloadend = function(event) {
            console.log(event, event.target.result);
            // 23 == data prefix
            var arrayBuffer = base64ToArrayBuffer(event.target.result.slice(23));
            var source = prepareAudioContext(arrayBuffer);
            //wavesurfer.loadArrayBuffer(arrayBuffer);
        };
        reader.readAsDataURL(blob);
        // wavesurfer.loadBlob(blob);
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

        var source = null;
        var context = new AudioContext();
        var audioBuffer = arrayBuffer;
        // source is global so we can call .noteOff() later.
        source = prepareAudioContext(arrayBuffer);

        wavesurfer.loadArrayBuffer(arrayBuffer);
        //wavesurfer.load('../sound.mp3');
        document.getElementById("play_stop").style.display = "block"
        document.getElementById("wait").style.display = "block"
    };

    document.querySelector('#play_stop').addEventListener('click', wavesurfer.playPause.bind(wavesurfer));

    return exports;
});
