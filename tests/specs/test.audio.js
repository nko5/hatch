define(["Squire"], function(Squire) {
    "use strict";
    var injector;
    injector = new Squire();

    injector.store("player").require(["chai", "sinon", "sinon-chai", "audio", "mocks"], function(chai, sinon, sinonChai, audio, mocks) {
        var expect;

        expect = chai.expect;
        chai.use(sinonChai);
        describe('Audio', function() {
            it("processes audio files", function() {
                var file, mock;

                file = {}
                mock = sinon.mock(mocks.store.player).expects("loadFromBlob");
                audio.processAudio(file);
                mock.verify()
            });
        });
    });
});
