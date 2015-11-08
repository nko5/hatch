define(["audio", "canvas", "helpers/dom"], function(audio, canvas, dom) {
    "use strict";
    var exports, upload, MAX_FILE_SIZE, processUpload;

    /**
     * Delegates the uploaded file to the respective module method.
     *
     * @module upload
     * @requires canvas
     * @requires audio
     * @requires helper/dom
     */
    exports = {};

    upload = document.getElementById("upload");
    MAX_FILE_SIZE = 1 * 1000 * 1000; // 1 mB

    /**
     * Clears pending error message from screen.
     */
    exports.clearErrorMessages = function() {
        var uploadContainer;

        uploadContainer = upload.parentElement;
        if (dom.hasChild(uploadContainer, ".error")) {
            dom.removeChildren(uploadContainer, ".error");
        }
    };

    /**
     * Displays a message, that the uploaded file is too large to submit.
     *
     * @param {Number} filesize - Size of the file to upload in bytes.
     */
    exports.fileToLarge = function(filesize) {
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

    /**
     * Decide which module shall process the file if it's small enough.
     *
     * @listens change
     */
    exports.processUpload = function() {
        var audioMimeTypes, imageMimeTypes, file;

        audioMimeTypes = ["audio/mpeg"];
        imageMimeTypes = ["image/jpeg", "image/png"];

        file = upload.files[0];
        canvas.width = canvas.width; // Clear canvas
        exports.clearErrorMessages();

        if (file.size > MAX_FILE_SIZE) {
            exports.fileToLarge(file.size);
            return;
        }

        if (audioMimeTypes.indexOf(file.type) > -1) {
            audio.processAudio(file);
        };

        if (imageMimeTypes.indexOf(file.type) > -1) {
            canvas.processImage(file);
        }
    };

    upload.addEventListener('change', exports.processUpload);

    return exports;
});
