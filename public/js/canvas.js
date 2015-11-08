/**
 * Draws an uploaded image on the canvas element.
 *
 * @module canvas
 * @requires q-xhr
 * @requires helper/dom
 */
define(["q-xhr", "helpers/dom"], function(Q, dom) {
    "use strict";
    var upload, canvas, MAX_FILE_SIZE, clearErrorMessages, fileToLarge, rgb2hex, prepareImageData, informBackend, processAudio, processImage, processUpload;

    upload = document.getElementById("upload");
    canvas = document.getElementById("canvas");
    MAX_FILE_SIZE = 1 * 1000 * 1000; // 1 mB

    clearErrorMessages = function() {
        var uploadContainer;

        uploadContainer = upload.parentElement;
        if (dom.hasChild(uploadContainer, ".error")) {
            dom.removeChildren(uploadContainer, ".error");
        }
    };

    fileToLarge = function(filesize) {
        var uploadContainer, errorMessage, errorContainer;

        uploadContainer = upload.parentElement;
        errorMessage = 'Sorry, your file (' + filesize + ' bytes) is larger than our limit of ' + MAX_FILE_SIZE + ' bytes.';

        if (dom.hasChild(uploadContainer, ".error")) {
            errorContainer = uploadContainer.getElementsByClassName("error")[0];
            errorContainer.innerHTML = errorMessage;
        } else {
            errorContainer = document.createElement('div');
            errorContainer.classList.add('error');
            errorContainer.appendChild(document.createTextNode(errorMessage));
            uploadContainer.appendChild(errorContainer);
        }
    };

    rgb2hex = function(r, g, b) {
        if (r > 255 || g > 255 || b > 255) {
            throw new Error("Invalid coulour: (" + r + ", " + g + ", " + b + ")");
        }

        return ((r << 16) | (g << 8) | b).toString(16);
    };

    prepareImageData = function(imageData) {
        var pixels, i, len, pixel;
        pixels = [];

        for (i = 0, len = imageData.length; i < len; i += 4) {
            pixel = imageData.subarray(i, i+4);
            pixels.push(rgb2hex(pixel[0], pixel[1], pixel[2]));
        }
        return pixels;
    };

    informBackend = function(image, execFlag) {
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

    processAudio = function(file) {
    };

    processImage = function(file) {
        var ctx, reader, img;
        ctx = canvas.getContext("2d");
        reader = new FileReader();

        var imagediv = document.getElementById("image");

        reader.onloadend = function() {
            img = new Image();
            img.onload = function() {
                canvas.style.width ='100%';
                canvas.style.height='100vh';

                canvas.width = canvas.offsetWidth;
                canvas.height = canvas.offsetHeight
                ctx.drawImage(img, 0, 0);
                informBackend(ctx.getImageData(0, 0, img.width, img.height), false);
            };
            // Triggers load event on img
            img.src = reader.result;
        };

        // Triggers loadend event on reader
        reader.readAsDataURL(file);
    };

    processUpload = function() {
        var audioMimeTypes, imageMimeTypes, file;

        audioMimeTypes = ["audio/mpeg"];
        imageMimeTypes = ["image/jpeg", "image/png"];

        file = upload.files[0];
        canvas.width = canvas.width; // Clear canvas
        clearErrorMessages();

        if (file.size > MAX_FILE_SIZE) {
            fileToLarge(file.size);
            return;
        }

        if (audioMimeTypes.indexOf(file.type) > -1) {
            processAudio(file);
        };

        if (imageMimeTypes.indexOf(file.type) > -1) {
            processImage(file);
        }
    };

    upload.addEventListener('change', processUpload);

    return {
    };
});
