define(["q-xhr"], function(Q) {
    "use strict";
    var upload, canvas, previewImage;

    upload = document.getElementById("upload");
    canvas = document.getElementById("canvas");

    previewImage = function() {
        var file, ctx, reader, img;

        file = upload.files[0];
        ctx = canvas.getContext("2d");
        reader = new FileReader();
        console.log("previewImage", file, ctx, reader);

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
