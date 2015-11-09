(function(audioGlobal) {
    "use strict";
    var baudio, makeApi, isNode, isAMD, loadDependencies;

    baudio = require('baudio');
    makeApi = function(audio) {
        // TODO: Cleanup
        var i, MAX_RECORD_TIME, base64stream;

        i = 0;
        MAX_RECORD_TIME = 10;

        audio.playSound = function(frequency, duration, amplitude) {
            var square, b, ps;

            square = function(frequency, time) {
                return Math.sin(10 * time * frequency) < 0 ? -1 : 1;
            };

            b = baudio(function(time) {
                return amplitude * (square(frequency, time) + square(frequency + 1, time)) * (time < duration);
            });
            ps = b.record("public/sound.mp3");
            setTimeout(function() {
                ps.kill('SIGHUP');
                b = void 0;
            }, duration * 1000);
            return b;
        };

        audio.loop = function(pixelArray, io) {
            var parse, shallPlay, audioInput, b, path, ps, index;

            pixelArray = pixelArray;
            parse = audio.parseInput(pixelArray);
            shallPlay = parse.shallPlay;
            parse = parse.parse;

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
            for (var j = 0; j < 100; j++) {
                // console.log(j, parse[j])
                index = Math.floor(parse.length * Math.random());
                b = audio.playSound(parse[index].g * parse[index].b, 1, 1 / parse[index].r);
            }
            // Defined in ./socket: audio.send(b.pipe);
            /*
            audioInput.play();
            */
            path = __dirname + "/../../../public/sound.mp3";
            ps = audioInput.record(path, {c: 2, t: 'mp3'});
            console.log("Written to " + path, ps.spawnargs.join(' '));

            base64stream = (function(pixelArray) {
                var hex;

                hex = Object.keys(JSON.parse(pixelArray.pixel));
                return new Buffer(hex.join(";")).toString('base64');
            })(pixelArray);

            return base64stream;
        };
        
        return audio;
    };

    isNode = typeof module !== "undefined" && module.exports && typeof require === "function";
    isAMD = typeof define === "function" && typeof define.amd === "object" && define.amd;

    loadDependencies = function(require, exports) {
        makeApi(exports);
    }

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
