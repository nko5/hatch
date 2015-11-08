define(["helpers/backend", "player"], function(backend, player) {
    "use strict";
    var exports, element, reader, drawImage, processImage;

    /**
     * Draws an uploaded image on the canvas element.
     *
     * @module canvas
     * @requires helper/backend
     * @requires player
     */
    exports = {};

    element = document.getElementById("canvas");

    /**
     * For testing purposes.
     *
     * @type FileReader
     */
    exports.reader = new FileReader();

    /**
     * For testing purposes.
     *
     * @type FileReader
     */
    exports.image = new Image();

    drawImage = function(event, img, ctx, cb) {
        img.onload = function(event) {
            element.style.width ='100%';
            element.style.height='100vh';

            element.width = element.offsetWidth;
            element.height = element.offsetHeight
            ctx.drawImage(event.target, 0, 0);
            cb(ctx.getImageData(0, 0, img.width, img.height));
        };
        // Triggers load event on img
        img.src = event.target.result;
    };

    /**
     * Extracts pixels out of image and invoke information of backend.
     *
     * @param {ImageData} file - The file to upload.
     */
    exports.processImage = function(file) {
        var ctx, reader, onConversionDone, informBackend;

        ctx = element.getContext("2d");
        reader = exports.reader;
        onConversionDone = function(response) {
            var base64;
            base64 = JSON.parse(response.data).base64;
            player.loadFromBase64(base64);
        }

        informBackend = function(imageData) {
            console.log("informBackend called", backend, imageData);
            if (backend && typeof backend.inform !== "undefined") {
                backend.inform(imageData, false).then(onConversionDone);
            } else {
                console.log("Looks like backend.inform being undefined", backend);
            }
        };

        reader.onloadend = function(event) {
            drawImage(event, exports.image, ctx, informBackend);
        };

        // Triggers loadend event on reader
        reader.readAsDataURL(file);
    };

    return exports;
});
