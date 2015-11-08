define(["chai", "canvas"], function(chai, canvas) {
    var expect;

    expect = chai.expect;
    describe('Canvas', function() {
        it("processes images", function() {
            var image;
            image = new File()
            canvas.processImage(image);
            expect(false).to.be(true);
        });
    });
});
