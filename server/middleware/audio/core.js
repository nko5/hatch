(function(audioGlobal) {
    "use strict";
    var baudio, makeApi, isNode, isAMD, loadDependencies;

    baudio = require('baudio');

    makeApi = function(audio) {
        // TODO: Cleanup
        var test, hex2rgb, parseInput, i, base64stream;

        // Get the dummy data
        test = '[{"index":"1","r":"190","g":"85","b":"130","a":"0.5"}, {"index":"2","r":"110","g":"45","b":"90","a":"0.9"}]';

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

        audio.loop = function(pixelArray) {
            var parse, shallPlay, audioInput, b;

            pixelArray = pixelArray || test;
            parse = parseInput(pixelArray);
            shallPlay = parse.shallPlay;
            parse = parse.parse;

            audioInput = function(t) {
                var pixel;

                if (typeof parse !== "object") {
                    parse = JSON.parse(parse);
                }
                pixel = parse[i] ? parse[i] : parse;
                console.log(i, t, pixel);
                
                // sin(t * r * g * Pi) + sin(t * b) * (t % index > a)
                return Math.sin(t * pixel.r * Math.PI * pixel.g) +
                    Math.sin(t * pixel.b) * (t % pixel.index > pixel.a);
            };

            /*
            setTimeout(function(){
                b = baudio(audioInput);
                if (shallPlay) {
                    console.log("Making noise");
                    b.play();
                }
                audio.loop(JSON.stringify({
                    pixel: parse,
                    play: shallPlay
                }));
            }, 3000);
            */

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
