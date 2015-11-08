define(["testHelper"], function(testHelper) {
    "use strict";
    var injector, expect;
    expect = testHelper.expect;
    injector = testHelper.injector

    injector.store("player");
    describe('Audio', function() {
        it("processes audio files", function(done) {
            injector.require(["audio", "mocks"], function(audio, mocks) {
                var file, mock;

                file = {}
                mock = sinon.mock(mocks.store.player).expects("loadFromBlob");
                audio.processAudio(file);
                mock.verify()
                done();
            });
        });
    });
});
