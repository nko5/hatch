(function(audioGlobal, global) {
    "use strict";
    var makeApi, isNode, isAMD, loadDependencies;

    makeApi = function(audio) {
        var hex2rgb, parseInput, exports;
        
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
                    return audio.hex2rgb(hex);
                });;
            } else {
                throw new Error("Invalid input type", input, typeof input);
            }
            return {
                parse: parse,
                shallPlay: shallPlay
            };
        }
        exports = {};
        exports.hex2rgb = audio.hex2rgb = hex2rgb;
        exports.parseInput = audio.parseInput = parseInput;

        return exports;
    };

    loadDependencies = function(require, exports, module) {
        var audio;
        audio = require("./core");
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
