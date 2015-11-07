define(["wavesurfer"], function(WaveSurfer) {
  "use strict"

  var wavesurfer = Object.create(WaveSurfer);

  wavesurfer.init({
    container: '#player',
    waveColor: 'violet',
    progressColor: 'purple'
  });

  wavesurfer.on('ready', function () {
      wavesurfer.play();
  });

  wavesurfer.load('../test.mp3');

});
