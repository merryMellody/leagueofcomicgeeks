module.exports = function(lofcg) {
  const options = { type: lofcg.types.SERIES };
  const filteredOptions = { publishers: ["Image Comics"], ...options };
  const sortedOptions = { sort: lofcg.sort.DESCENDING, ...options };

  describe("get series list", function() {
    it("should provide no comics in collection with an invalid user id", function(done) {
      lofcg.collection.get("foo", options, (err, collection) => {
        expect(err).toBeNull();
        expect(collection).toEqual([]);
        done();
      });
    });

    it("should provide a list of comics from a users collection", function(done) {
      lofcg.collection.get(readonlyUserId, options, (err, collection) => {
        expect(err).toBeNull();
        expect(collection).toMatchJsonSnapshot("all-series-collection");
        Object.entries(collection).forEach(comic => {
          expect(comic).toBeAComicSeries();
        });
        done();
      });
    });

    it("should provide a filtered list of comics from a users collection", function(done) {
      lofcg.collection.get(
        readonlyUserId,
        filteredOptions,
        (err, collection) => {
          expect(err).toBeNull();
          expect(collection).toMatchJsonSnapshot("filtered-series-collection");
          Object.entries(collection).forEach(comic => {
            expect(comic).toBeAComicSeries();
          });
          done();
        }
      );
    });

    it("should provide a sorted list of comics from a users collection", function(done) {
      lofcg.collection.get(readonlyUserId, sortedOptions, (err, collection) => {
        expect(err).toBeNull();
        expect(collection).toMatchJsonSnapshot("sorted-series-collection");
        Object.entries(collection).forEach(comic => {
          expect(comic).toBeAComicSeries();
        });
        done();
      });
    });
  });
};
