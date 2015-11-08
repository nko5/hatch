define(["testHelper"], function(testHelper) {
    "use strict";
    var injector, expect;
    expect = testHelper.expect;
    injector = testHelper.injector

    injector.store("q-xhr");
    describe("Backend", function() {
        var sandbox;

        beforeEach("creates a sandbox", function() {
            sandbox = sinon.sandbox.create();
        });

        afterEach("restores sandbox", function() {
            sandbox.restore();
        });

        after("clean up injector", function() {
            injector.clean("q-xhr");
        });

        it("informs the backend", function(done) {
            injector.require(["helpers/backend", "mocks"], function(backend, mocks) {
                var blob, Q, spy;

                blob = {
                    data: []
                };
                Q = mocks.store["q-xhr"].xhr;
                spy = sandbox.spy(Q, "post");
                backend.inform(blob, true);

                expect(spy).to.have.been.called;
                done();
            });
        });
    });
});
