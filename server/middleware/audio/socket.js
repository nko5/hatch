(function(audioGlobal, global) {
    "use strict";
    var Writable, BrowserStream, makeApi, isNode, isAMD, loadDependencies;

    Writable = require('stream').Writable;
    BrowserStream = new Writable();

    makeApi = function(audio) {
        var send, exports;

        send = function(ps) {
            BrowserStream._write = function(chunk, enc, next) {
                var string;

                string = chunk.toString("base64");
                io.sockets.emit("news", string);
                next();
            };
            ps.pipe(BrowserStream);
        };
        exports = {};
        exports.send = audio.send = send;

        return exports;
    };

    loadDependencies = function(require, exports, module) {
        audio = require("./core");
        module.exports = makeApi(audio);
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
