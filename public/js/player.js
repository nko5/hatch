define(["wavesurfer"], function(WaveSurfer) {
  "use strict"

  var wavesurfer = Object.create(WaveSurfer);

  wavesurfer.init({
    container: '#player',
    waveColor: 'blue',
    progressColor: 'blue'
  });

  wavesurfer.on('ready', function () {
      wavesurfer.play();
  });

  wavesurfer.load('../test.mp3');

  document.querySelector('[id="play_stop"]').addEventListener('click', wavesurfer.playPause.bind(wavesurfer));

});
