define(["testHelper"], function(testHelper) {
    "use strict";
    var injector, expect;
    expect = testHelper.expect;
    injector = testHelper.injector

    injector.store("wavesurfer");
    describe("Player", function() {
        var sandbox;

        beforeEach("creates a sandbox", function() {
            sandbox = sinon.sandbox.create();
        });

        afterEach("restores sandbox", function() {
            sandbox.restore();
        });

        after("clean up injector", function() {
            injector.clean("wavesurfer");
        });

        it("can handle blobs", function(done) {
            injector.require(["player", "mocks"], function(player, mocks) {
                var blob, wavesurfer, mock;

                blob = {
                    name: "test.wav",
                    size: 1,
                    type: "audio/wav"
                };
                wavesurfer = mocks.store.wavesurfer;
                mock = sandbox.mock(wavesurfer).expects("loadBlob");
                player.loadFromBlob(blob);
                expect(mock).to.have.been.calledWith(blob);
                done();
            });
        });
    });
});
