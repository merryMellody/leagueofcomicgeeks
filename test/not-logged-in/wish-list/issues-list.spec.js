module.exports = function(lofcg) {
  require("../../shared/wish-list/issues-list.spec")(lofcg);

  describe("add issue to list", function() {
    it("should return error when adding to wish list without permission", function(done) {
      lofcg.wishList.add(testIssueId, err => {
        expect(err).toEqual(jasmine.any(Error));
        expect(err.message).toEqual("Unable to add comic to list");
        done();
      });
    });
  });

  describe("remove issue from list", function() {
    it("should return error when removing to wish list without permission", function(done) {
      lofcg.wishList.remove(testIssueId, err => {
        expect(err).toEqual(jasmine.any(Error));
        expect(err.message).toEqual("Unable to remove comic from list");
        done();
      });
    });
  });
};
