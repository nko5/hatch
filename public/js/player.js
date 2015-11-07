define(["wavesurfer"], function(wavesurfer) {
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

  wavesurfer.load('http://www.stephaniequinn.com/Music/Allegro%20from%20Duet%20in%20C%20Major.mp3');

});
