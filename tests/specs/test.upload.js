define(["testHelper"], function(testHelper) {
    "use strict";
    var injector, expect;
    expect = testHelper.expect;
    injector = testHelper.injector

    injector.store("helpers/dom").store("audio").store("canvas");
    describe('Upload', function() {
        var sandbox, node;

        node = document.querySelector("#upload");

        beforeEach("creates a sandbox and removes node elements", function() {
            sandbox = sinon.sandbox.create();
            while(node.firstChild) {
                node.removeChild(node.firstChild);
            }
        });

        afterEach("restores sandbox and removes node elements", function() {
            sandbox.restore();
            while(node.firstChild) {
                node.removeChild(node.firstChild);
            }
        });

        after("clean up injector", function() {
            injector.clean("helpers/dom").clean("audio").clean("canvas");
        });

        it("clears error messages", function(done) {
            injector.require(["upload", "mocks"], function(upload, mocks) {
                var dom, hasChildMock;
                dom = mocks.store["helpers/dom"];
                hasChildMock = sandbox.mock(dom).expects("hasChild");
                upload.clearErrorMessages();

                expect(hasChildMock).to.have.been.calledWith(node.parentElement, ".error");
                expect(hasChildMock).not.to.have.returned(0);
                done();
            });
        });
        it("clears error messages if present", function(done) {
            injector.require(["upload", "mocks"], function(upload, mocks) {
                var error, dom, removeChildrenMock;

                error = document.createElement("div");
                error.classList.add("error");
                node.parentElement.appendChild(error);

                dom = mocks.store["helpers/dom"];
                removeChildrenMock = sandbox.mock(dom).expects("removeChildren");
                upload.clearErrorMessages();

                expect(removeChildrenMock).to.have.been.calledOnce;
                done();
            });
        });

        describe("process upload", function() {
            var file, event;

            beforeEach("simulate file upload event", function() {
                file = {
                    size: 1,
                    type: "audio/mpeg"
                };
                event = {
                    target: {
                        files: [file]
                    }
                };
            });

            it("clears pending error messages", function(done) {
                injector.require(["upload", "mocks"], function(upload, mocks) {
                    var spy;
                    
                    file.size = 1000 * 1000 * 1000;
                    spy = sandbox.spy(upload, "clearErrorMessages");
                    upload.processUpload(event);
                    expect(spy).to.have.been.called;
                    done();
                });
            });

            it("refuses to upload too large files", function(done) {
                injector.require(["upload", "mocks"], function(upload, mocks) {
                    var spy;
                    
                    file.size = 1000 * 1000 * 1000;
                    spy = sandbox.spy(upload, "fileToLarge");
                    upload.processUpload(event);
                    expect(spy).to.have.been.called;
                    done();
                });
            });

            it("delegates audio files to audio module", function(done) {
                injector.require(["upload", "mocks"], function(upload, mocks) {
                    var audio, processAudioMock;

                    file.size = 1;
                    audio = mocks.store["audio"];
                    processAudioMock = sandbox.mock(audio).expects("processAudio");
                    upload.processUpload(event);
                    expect(processAudioMock).to.have.been.calledWith(file);
                    done();
                });
            });
            
            it("delegates image files to canvas module", function(done) {
                injector.require(["upload", "mocks"], function(upload, mocks) {
                    var canvas, processImageMock;

                    file.type = "image/png";
                    canvas = mocks.store["canvas"];
                    processImageMock = sandbox.mock(canvas).expects("processImage");
                    upload.processUpload(event);
                    expect(processImageMock).to.have.been.calledWith(file);
                    done();
                });
             });
        });
    });
});
