define(["chai", "chai-as-promised", "sinon", "sinon-chai", "Squire"], function(chai, chaiAsPromised, sinon, sinonChai, Squire) {
    "use strict";
    // Save some loading time by wrapping dependencies in this helper module
    chai.use(chaiAsPromised);
    chai.use(sinonChai);
    return {
        expect: chai.expect,
        injector: new Squire()
    };
});
