define(["testHelper"], function(testHelper) {
    "use strict";
    var injector, expect;
    expect = testHelper.expect;
    injector = testHelper.injector

    injector.store("player");
    describe('Audio', function() {
        var sandbox;

        beforeEach("creates a sandbox", function() {
            sandbox = sinon.sandbox.create();
        });

        afterEach("restores sandbox", function() {
            sandbox.restore();
        });

        after("clean up injector", function() {
            injector.clean("player");
        });

        it("processes audio files", function(done) {
            injector.require(["audio", "mocks"], function(audio, mocks) {
                var file, mock;

                file = {}
                mock = sandbox.mock(mocks.store.player).expects("loadFromBlob");
                audio.processAudio(file);
                expect(mock).to.have.been.calledWith(file);
                done();
            });
        });
    });
});
