(function(audioGlobal) {
    "use strict";
    var baudio, Writable, BrowserStream, makeApi, isNode, isAMD, loadDependencies;

    baudio = require('baudio');
    Writable = require('stream').Writable;
    BrowserStream = new Writable();
    
    makeApi = function(audio) {
        // TODO: Cleanup
        var hex2rgb, parseInput, i, MAX_RECORD_TIME, base64stream;

        hex2rgb = function(hex) {
            var result;

            result = /([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})/i.exec(hex);
            //console.log("Converted", hex, result);
            // result[0] conatins the input string hex
            return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            } : null;
        };

        parseInput = function(input) {
            var indices, parse, shallPlay;

            if (typeof input === "string") {
                parse = JSON.parse(input).pixel;
                shallPlay = JSON.parse(input).play;
            } else if (typeof input === "object") {
                shallPlay = input.play;
                indices = JSON.parse(input.pixel);
                parse = Object.keys(indices).map(function(hex) {
                    return hex2rgb(hex);
                });;
            } else {
                throw new Error("Invalid input type", input, typeof input);
            }
            return {
                parse: parse,
                shallPlay: shallPlay
            };
        };

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

            BrowserStream._write = function(chunk, enc, next) {
                var string;

                string = chunk.toString("base64");
                io.sockets.emit("news", string);
                next();
            };

            pixelArray = pixelArray;
            parse = parseInput(pixelArray);
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
            b.pipe(BrowserStream);
            /*
            audioInput.play();
            */
            path = __dirname + "/../../../public/sound.wav";
            ps = audioInput.record(path, {c: 2, t: 'wav'});
            console.log("Written to " + path, ps.spawnargs.join(' '));

            base64stream = (function() {
                var hex;

                hex = Object.keys(JSON.parse(pixelArray.pixel));
                return new Buffer(hex.join(";")).toString('base64');
            })();

            return base64stream;
        };
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
