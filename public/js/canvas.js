define(["q-xhr", "helpers/dom"], function(Q, dom) {
    "use strict";
    var upload, canvas, MAX_FILE_SIZE, clearErrorMessages, fileToLarge, previewImage;

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

    previewImage = function() {
        var file, ctx, reader, img;

        file = upload.files[0];
        clearErrorMessages();

        if (file.size > MAX_FILE_SIZE) {
            fileToLarge(file.size);
            return;
        }

        ctx = canvas.getContext("2d");
        reader = new FileReader();

        reader.onloadend = function() {
            img = new Image();
            img.onload = function() {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
            };
            // Triggers load event on img
            img.src = reader.result;
        };

        // Triggers loadend event on reader
        reader.readAsDataURL(file);
    };

    upload.addEventListener('change', previewImage);

    console.log('Submitting AJAX with', Q);
    Q.xhr.get('http://jsonplaceholder.typicode.com/posts/1').then(function(response) {
        console.log('Q works', response);
    }).catch(function(error) {
        console.log('Q failed', error);
    });;
    return {
        previewImage: previewImage
    }
});
