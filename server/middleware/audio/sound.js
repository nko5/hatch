(function(audioGlobal, global) {
    "use strict";
    var baudio, makeApi, isNode, isAMD, loadDependencies;

    baudio = require("baudio");

    makeApi = function(audio) {
        var MAX_RECORD_TIME, playTone, playMelody, image2sound, exports;

        MAX_RECORD_TIME = 10;

        playTone = function(frequency, amplitude, duration) {
            var square, b, ps;

            square = function(frequency, time) {
                return Math.sin(10 * time * frequency) < 0 ? -1 : 1;
            };

            b = baudio(function(time) {
                return amplitude * (square(frequency, time) + square(frequency + 1, time)) * (time < duration);
            });

            ps = b.play();
            b.record("public/sound.mp3");

            setTimeout(function() {
                ps.kill('SIGHUP');
                b = void 0;
            }, duration * 1000);

            return ps;
        };

        playMelody = function(notes) {
            var i, len, index, note, ps;
            len = notes.length;

            if (len > 100) {
                len = 100;
            }

            for (i = 0; i < len; i++) {
                index = Math.floor(len * Math.random());
                note = notes[index];
                ps = audio.playTone(note.g * note.b, 1, 1 / note.r);
            }
            audio.send(ps.stdin);
        };

        image2sound = function(image, io) {
            var parse, shallPlay, i, audioInput, path, ps, index, base64stream;

            parse = audio.parseInput(image);
            shallPlay = parse.shallPlay;
            parse = parse.parse;
            i = 0;

            audioInput = baudio(function(t){
                var pixel, tone;

                if (t > MAX_RECORD_TIME) {
                    audioInput.end();
                }

                if (typeof parse !== "object") {
                    parse = JSON.parse(parse);
                }
                pixel = parse[i] ? parse[i] : parse;

                // sin(t * r * g * Pi) + sin(t * b) * (t % index > a)
                tone = pixel.g * Math.sin(t * pixel.r * Math.PI * pixel.g) *
                    Math.cos(t * pixel.b);
                return tone;
            });

            audio.playMelody(parse);
            path = __dirname + "/../../../public/sound.mp3";
            ps = audioInput.record(path, {c: 2, t: 'mp3'});
            console.log("Written to " + path, ps.spawnargs.join(' '));

            base64stream = (function(image) {
                var hex;

                hex = Object.keys(JSON.parse(image.pixel));
                return new Buffer(hex.join(";")).toString('base64');
            })(image);

            return base64stream;
        };

        exports = {};
        exports.MAX_RECORD_TIME = audio.MAX_RECORD_TIME = MAX_RECORD_TIME;
        exports.playTone = audio.playTone = playTone;
        exports.playMelody = audio.playMelody = playMelody;
        exports.image2sound = audio.image2sound = image2sound;

        return exports;
    };

    loadDependencies = function(require, exports, module) {
        var audio;
        audio = require("./core");
        require("./socket");
        require("./helper");
        module.exports = makeApi(audio);
    };

    isNode = typeof module !== "undefined" && module.exports && typeof require === "function";
    isAMD = typeof define === "function" && typeof define.amd === "object" && define.amd;

    if (isAMD) {
        define(loadDependencies);
        return;
    }

    if (isNode) {
        loadDependencies(require, module.exports, module);
        return;
    }

    if (audioGlobal) {
        makeApi(audioGlobal);
    }
})(
    typeof audio === "object" && audio
);
