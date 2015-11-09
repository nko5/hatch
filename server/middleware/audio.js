var audio;

// Taken from sinon.js
audio = (function() {
    "use strict";
    var audioModule, isNode, isAMD, loadDependencies;

    isNode = typeof module !== "undefined" && module.exports && typeof require === "function";
    isAMD = typeof define === "function" && typeof define.amd === "object" && define.amd;

    loadDependencies = function(require, exports, module) {
        audioModule = module.exports = require("./audio/core");
        require("./audio/socket");
        require("./audio/helper");
    };

    if (isAMD) {
        define(loadDependencies);
    } else if (isNode) {
        loadDependencies(require, module.exports, module);
        audioModule = module.exports;
    } else {
        audioModule = {};
    }

    return audioModule;
})();
