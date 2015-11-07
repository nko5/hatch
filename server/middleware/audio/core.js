(function(audioGlobal) {
    "use strict";
    var baudio, makeApi, isNode, isAMD, loadDependencies;

    baudio = require('baudio');

    makeApi = function(audio) {
        // TODO: Cleanup
        var test, parse;

        // Get the dummy data
        test = '[{"index":"1","r":"190","g":"85","b":"130","a":"0.5"}, {"index":"2","r":"110","g":"45","b":"90","a":"0.9"}]';
        parse = JSON.parse(test);

        audio.loop = function() {
            var audioInput, b, i;

            i = 0;

            setTimeout(function(){
                audioInput = function(t) {
                    var pixel;

                    pixel = parse[i];
                    // sin(t * r * g * Pi) + sin(t * b) * (t % index > a)
                    return Math.sin(t * pixel.r * Math.PI * pixel.g) +
                        Math.sin(t * pixel.b) * (t % pixel.index > pixel.a);
                };
                b = baudio(audioInput);
                b.play();
                i++;
                if(i <= test.length-1){
                    audio.loop();
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
