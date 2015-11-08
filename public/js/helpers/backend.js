define(["q-xhr"], function(Q) {
    "use strict";
    var exports, rgb2hex, collectPixels, prepareImageData;

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

        return ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    };

    /**
     * Converts imageData to an array of hex values
     *
     * @private
     * @param {Uint8ClampedArray} imageData - RGBA values of image.
     * @returns {Object} pixels - Object with hex values as keys and respective indices collect in arrays.
     */
    collectPixels = function(imageData) {
        var pixels, i, len, pixel, hex;
        pixels = {};

        for (i = 0, len = imageData.length; i < len; i += 4) {
            pixel = imageData.subarray(i, i+4);
            hex = rgb2hex(pixel[0], pixel[1], pixel[2]);
            if (!pixels[hex]) {
                pixels[hex] = [];
            }
            pixels[hex].push(i / 4);
        }
        return pixels;
    };

    /**
     * If invoking collectPixels isn't enough, process them further here (e.g. build ranges).
     *
     * @private
     * @param {Uint8ClampedArray} imageData - RGBA values of image.
     * @returns {Object} Object with hex values as keys and respective indices collect in arrays.
     */
    prepareImageData = function(imageData) {
        return collectPixels(imageData);
    };

    /**
     * Send image to the server for further processing.
     *
     * @param {ImageData} image - ImageData object of the uploaded image.
     * @param {Boolean} execFlag - Whether to run baudio playing a sound.
     */
    exports.inform = function(image, execFlag) {
        var pixels;
        /*
        xhr.get('/api').then(function(response) {
            console.log('Q get works', response);
        }).catch(function(error) {
            console.log('Q get failed', error);
        });
        */

        pixels = JSON.stringify(prepareImageData(image.data));

        return Q.xhr.post('/api', {
            pixel: pixels,
            play: execFlag
        });

        /*
        xhr.put('/api', {
            say: 'hello'
        }).then(function(response) {
            console.log('Q put works', response);
        }).catch(function(error) {
            console.log('Q put failed', error);
        });
        */
    };

    return exports;
});
