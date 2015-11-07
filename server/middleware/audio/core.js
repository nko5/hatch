(function(audioGlobal) {
    "use strict";
    var baudio, makeApi, isNode, isAMD, loadDependencies;
    
    baudio = require('baudio');

    makeApi = function(audio) {
        // TODO: Cleanup
        var test, parse, i, b;

        // Get the dummy data
        test = '{"pixel": [{"index":"1","r":"190","g":"85","b":"130","a":"0.5"}], "pixel": [{"index":"2","r":"110","g":"45","b":"90","a":"0.9"}]}';
        parse = JSON.parse(test);

        i = 0;

        b = baudio(function (t) {
            return Math.sin(t * parse.pixel[i].r * Math.PI * parse.pixel[i].g) +
                Math.sin(t * parse.pixel[i].b) * (t % parse.pixel[i].index > parse.pixel[i].a);
        });
        b.play();

        audio.loop = function() {
            setTimeout(function(){
                var b = baudio(function (t) {
                    return Math.sin(t * parse.pixel[i].r * Math.PI * parse.pixel[i].g) +
                        Math.sin(t * parse.pixel[i].b) * (t % parse.pixel[i].index > parse.pixel[i].a);
                });
                b.play();

                if(i <= 10){
                    audio.loop();
                }

            }, 5000);
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
