define(["testHelper"], function(testHelper) {
    "use strict";
    var injector, expect;
    expect = testHelper.expect;
    injector = testHelper.injector

    injector.store("helpers/backend").store("player");
    describe("Canvas", function() {
        var sandbox, blob;

        beforeEach("creates a sandbox", function() {
            sandbox = sinon.sandbox.create();
            blob = new Blob([42], {type: 'image/png'});
        });

        afterEach("restores sandbox", function() {
            sandbox.restore();
        });

        after("clean up injector", function() {
            injector.clean("helpers/backend").clean("player");
        });

        it("sends image data to the backend", function(done) {
            injector.require(["canvas", "mocks"], function(canvas, mocks) {
                var loadEndEvent, loadEvent, backend, mock;

                // red dot, 10x10 pixel, thank you, Wikipedia :-)
                loadEndEvent = {
                    target: {
                        result: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9YGARc5KB0XV+IAAAAddEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIFRoZSBHSU1Q72QlbgAAAF1JREFUGNO9zL0NglAAxPEfdLTs4BZM4DIO4C7OwQg2JoQ9LE1exdlYvBBeZ7jqch9//q1uH4TLzw4d6+ErXMMcXuHWxId3KOETnnXXV6MJpcq2MLaI97CER3N0vr4MkhoXe0rZigAAAABJRU5ErkJggg==",
                    }
                };

                loadEvent = {
                    target: canvas.image
                };

                backend = mocks.store["helpers/backend"];
                mock = sandbox.mock(backend).expects("inform");

                canvas.reader = {
                    result: "data:image/png;base64,NDI=",
                    readAsDataURL: function() {}
                }
                canvas.processImage(blob);

                canvas.reader.onloadend(loadEndEvent);
                canvas.image.onload(loadEvent);
                expect(mock).to.eventually.have.been.called;
                done();
            });
        });

        xit("can make music", function(done) {
            injector.require(["canvas", "mocks"], function(canvas, mocks) {
                var player, mock;
                console.log(canvas);
                player = mocks.store.player;
                mock = sandbox.mock(player).expects("loadFromBase64");
                canvas.processImage(blob);
                expect(mock).eventually.to.have.been.called;
                done();
            });
        });
    });
});
