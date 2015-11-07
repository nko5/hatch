define(["wavesurfer"], function(WaveSurfer) {
  "use strict";

  var wavesurfer, base64ToArrayBuffer, loadFromBlob, loadFromBase64;
  
  wavesurfer = Object.create(WaveSurfer);
  console.log("WaveSurfer instance", wavesurfer, WaveSurfer);

  wavesurfer.init({
    container: '#player',
    waveColor: 'violet',
    progressColor: 'purple'
  });

  wavesurfer.on('ready', function () {
      wavesurfer.play();
  });

  //wavesurfer.load('../test.mp3');

  base64ToArrayBuffer = function(base64) {
      var binaryString, i, len, bytes;

      binaryString = window.atob(base64);
      len = binaryString.length;
      bytes = new Uint8Array(len);
      
      for (i = 0; i < len; i++) {
          bytes[i] = binaryString.charCodeAt(i);
      }
      return bytes.buffer;
  };

  loadFromBlob = function(blob) {
      wavesurfer.loadBlob(blob);
  };

  loadFromBase64 = function(base64) {
      var arrayBuffer;

      // base64 = "data:audio/mp3;base64," + base64;

      arrayBuffer = base64ToArrayBuffer(base64);
      wavesurfer.loadArrayBuffer(arrayBuffer);
  };
  return {
      loadFromBlob: loadFromBlob,
      loadFromBase64: loadFromBase64
  };
});
