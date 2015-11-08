define(["helpers/backend"], function(backend) {
    "use strict";
    var exports, canvas, processImage;

    /**
     * Draws an uploaded image on the canvas element.
     *
     * @module canvas
     * @requires helper/backend
     */
    exports = {};

    canvas = document.getElementById("canvas");

    /**
     * Extracts pixels out of image and invoke information of backend.
     *
     * @param {ImageData} file - The file to upload.
     */
    exports.processImage = function(file) {
        var ctx, reader, imageDiv, img;

        ctx = canvas.getContext("2d");
        reader = new FileReader();
        imageDiv = document.getElementById("image");

        reader.onloadend = function() {
            img = new Image();
            img.onload = function() {
                canvas.style.width ='100%';
                canvas.style.height='100vh';

                canvas.width = canvas.offsetWidth;
                canvas.height = canvas.offsetHeight
                ctx.drawImage(img, 0, 0);
                backend.inform(ctx.getImageData(0, 0, img.width, img.height), false);
            };
            // Triggers load event on img
            img.src = reader.result;
        };

        // Triggers loadend event on reader
        reader.readAsDataURL(file);
    };

    return exports;
});
