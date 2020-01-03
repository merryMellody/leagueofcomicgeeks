module.exports = function(lofcg) {
  describe("get issues list", function() {
    it("should provide no comics in collection with an invalid user id", function(done) {
      lofcg.collection.get("foo", (err, collection) => {
        expect(err).toBeNull();
        expect(collection).toEqual([]);
        done();
      });
    });

    it("should provide a list of comics from a users collection", function(done) {
      lofcg.collection.get(readonlyUserId, (err, collection) => {
        expect(err).toBeNull();
        expect(collection).toMatchJsonSnapshot("all-issues-collection");
        Object.entries(collection).forEach(comic => {
          expect(comic).toBeAComicIssue();
        });
        done();
      });
    });

    it("should provide a filtered list of comics from a users collection", function(done) {
      lofcg.collection.get(
        readonlyUserId,
        { publishers: ["Image Comics"] },
        (err, collection) => {
          expect(err).toBeNull();
          expect(collection).toMatchJsonSnapshot("filtered-issues-collection");
          Object.entries(collection).forEach(comic => {
            expect(comic).toBeAComicIssue();
          });
          done();
        }
      );
    });

    it("should provide a sorted list of comics from a users collection", function(done) {
      lofcg.collection.get(
        readonlyUserId,
        { sort: lofcg.sort.DESCENDING },
        (err, collection) => {
          expect(err).toBeNull();
          expect(collection).toMatchJsonSnapshot("sorted-issues-collection");
          Object.entries(collection).forEach(comic => {
            expect(comic).toBeAComicIssue();
          });
          done();
        }
      );
    });
  });
};
