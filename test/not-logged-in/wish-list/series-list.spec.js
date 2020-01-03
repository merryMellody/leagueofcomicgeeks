module.exports = function(lofcg) {
  require("../../shared/wish-list/series-list.spec")(lofcg);

  describe("add series to list", function() {
    it("should return error when adding to wish list without permission", function(done) {
      lofcg.wishList.add(testIssueId, { type: lofcg.types.SERIES }, err => {
        expect(err).toEqual(jasmine.any(Error));
        expect(err.message).toEqual("Unable to add series to list");
        done();
      });
    });
  });

  describe("remove series from list", function() {
    it("should return error when removing to wish list without permission", function(done) {
      lofcg.wishList.remove(testIssueId, { type: lofcg.types.SERIES }, err => {
        expect(err).toEqual(jasmine.any(Error));
        expect(err.message).toEqual("Unable to remove series from list");
        done();
      });
    });
  });
};
