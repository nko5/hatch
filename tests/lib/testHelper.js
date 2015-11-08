define(["chai", "sinon", "sinon-chai", "Squire"], function(chai, sinon, sinonChai, Squire) {
    "use strict";
    // Save some loading time by wrapping dependencies in this helper module
    chai.use(sinonChai);
    return {
        expect: chai.expect,
        injector: new Squire()
    };
});
