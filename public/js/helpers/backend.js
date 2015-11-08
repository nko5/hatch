define(["q-xhr"], function(Q) {
    "use strict";
    var exports, rgb2hex, prepareImageData;

    /**
     * Talks with the backend.
     *
     * @module helper/backend
     * @requires q-xhr
     */
    exports = {};

    /**
     * Maps rgb values to their hex representation.
     *
     * @private
     * @param {Number} r - R component of pixel.
     * @param {Number} g - G component of pixel.
     * @param {Number} b - B component of pixel.
     * @returns {String} Hex representation of pixel.
     * @throws {Error} If r, g or b aren't within [0, 255[.
     */
    rgb2hex = function(r, g, b) {
        if (r > 255 || g > 255 || b > 255) {
            throw new Error("Invalid coulour: (" + r + ", " + g + ", " + b + ")");
        }

        return ((r << 16) | (g << 8) | b).toString(16);
    };

    /**
     * Converts imageData to an array of hex values
     *
     * @private
     * @param {Uint8ClampedArray} imageData - RGBA values of image.
     * @returns {Array} pixels - Array of hex representation of the image pixels.
     */
    prepareImageData = function(imageData) {
        var pixels, i, len, pixel;
        pixels = [];

        for (i = 0, len = imageData.length; i < len; i += 4) {
            pixel = imageData.subarray(i, i+4);
            pixels.push(rgb2hex(pixel[0], pixel[1], pixel[2]));
        }
        return pixels;
    };

    /**
     * Send image to the server for further processing.
     *
     * @param {ImageData} image - ImageData object of the uploaded image.
     * @param {Boolean} execFlag - Whether to run baudio playing a sound.
     */
    exports.inform = function(image, execFlag) {
        var pixels;

        Q.xhr.get('/api').then(function(response) {
            console.log('Q get works', response);
        }).catch(function(error) {
            console.log('Q get failed', error);
        });

        pixels = JSON.stringify(prepareImageData(image.data));
        console.log("Transmitting", pixels);

        Q.xhr.post('/api', {
            pixel: pixels,
            play: execFlag
        }).then(function(response) {
            console.log('Q post works', response);
        }).catch(function(error) {
            console.log('Q post failed', error);
        });

        Q.xhr.put('/api', {
            say: 'hello'
        }).then(function(response) {
            console.log('Q put works', response);
        }).catch(function(error) {
            console.log('Q put failed', error);
        });
    };

    return exports;
});
