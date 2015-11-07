(function(audioGlobal) {
    "use strict";
    var baudio, makeApi, isNode, isAMD, loadDependencies;

    baudio = require('baudio');

    makeApi = function(audio) {
        // TODO: Cleanup
        var test, parseInput;

        // Get the dummy data
        test = '[{"index":"1","r":"190","g":"85","b":"130","a":"0.5"}, {"index":"2","r":"110","g":"45","b":"90","a":"0.9"}]';

        parseInput = function(input) {
            var parse, shallPlay;

            if (typeof input === "string") {
                parse = JSON.parse(input).pixel;
                shallPlay = JSON.parse(input).play;
            } else if (typeof input === "object") {
                parse = input.pixel;
                shallPlay = input.play;
            } else {
                throw new Error("Invalid input type", input, typeof input);
            }
            return {
                parse: parse,
                shallPlay: shallPlay
            };
        };

        audio.loop = function(pixelArray) {
            var parse, shallPlay, audioInput, b, i;

            pixelArray = pixelArray || test;
            parse = parseInput(pixelArray);
            shallPlay = parse.shallPlay;
            parse = parse.parse;
            i = 0;
            audioInput = function(t) {
                var pixel;

                if (typeof parse !== "object") {
                    parse = JSON.parse(parse);
                }
                pixel = parse[i] ? parse[i] : parse;
                // sin(t * r * g * Pi) + sin(t * b) * (t % index > a)
                return Math.sin(t * pixel.r * Math.PI * pixel.g) +
                    Math.sin(t * pixel.b) * (t % pixel.index > pixel.a);
            };

            setTimeout(function(){
                b = baudio(audioInput);
                if (shallPlay) {
                    console.log('Making noise');
                    b.play();
                }
                i++;
                if(i <= 1){
                    audio.loop(JSON.stringify({
                        pixel: parse,
                        play: shallPlay
                    }));
                }

            }, 3000);
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
