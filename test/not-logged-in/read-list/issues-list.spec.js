module.exports = function(lofcg) {
  require("../../shared/read-list/issues-list.spec")(lofcg);

  describe("add issue to list", function() {
    it("should return error when adding to read list without permission", function(done) {
      lofcg.readList.add(testIssueId, err => {
        expect(err).toEqual(jasmine.any(Error));
        expect(err.message).toEqual("Unable to add comic to list");
        done();
      });
    });
  });

  describe("remove issue from list", function() {
    it("should return error when removing to read list without permission", function(done) {
      lofcg.readList.remove(testIssueId, err => {
        expect(err).toEqual(jasmine.any(Error));
        expect(err.message).toEqual("Unable to remove comic from list");
        done();
      });
    });
  });
};
