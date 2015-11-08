/**
 * Delegates the uploaded file to the respective module method.
 *
 * @module upload
 * @requires canvas
 * @requires audio
 * @requires helper/dom
 */
define(["audio", "canvas", "helpers/dom"], function(audio, canvas, dom) {
    "use strict";
    var upload, MAX_FILE_SIZE, clearErrorMessages, fileToLarge, processUpload;

    upload = document.getElementById("upload");
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
            audio.processAudio(file);
        };

        if (imageMimeTypes.indexOf(file.type) > -1) {
            canvas.processImage(file);
        }
    };

    upload.addEventListener('change', processUpload);

    return {
    };
});
