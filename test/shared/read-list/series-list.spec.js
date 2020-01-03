module.exports = function(lofcg) {
  const options = { type: lofcg.types.SERIES };
  const filteredOptions = { publishers: ["Image Comics"], ...options };
  const sortedOptions = { sort: lofcg.sort.DESCENDING, ...options };

  describe("get series list", function() {
    it("should provide no comics in read list with an invalid user id", function(done) {
      lofcg.readList.get("foo", options, (err, readList) => {
        expect(err).toBeNull();
        expect(readList).toEqual([]);
        done();
      });
    });

    it("should provide a list of comics from a users read list", function(done) {
      lofcg.readList.get(readonlyUserId, options, (err, readList) => {
        expect(err).toBeNull();
        expect(readList).toMatchJsonSnapshot("all-series-read-list");
        Object.entries(readList).forEach(comic => {
          expect(comic).toBeAComicSeries();
        });
        done();
      });
    });

    it("should provide a filtered list of comics from a users read list", function(done) {
      lofcg.readList.get(readonlyUserId, filteredOptions, (err, readList) => {
        expect(err).toBeNull();
        expect(readList).toMatchJsonSnapshot("filtered-series-read-list");
        Object.entries(readList).forEach(comic => {
          expect(comic).toBeAComicSeries();
        });
        done();
      });
    });

    it("should provide a sorted list of comics from a users read list", function(done) {
      lofcg.readList.get(readonlyUserId, sortedOptions, (err, readList) => {
        expect(err).toBeNull();
        expect(readList).toMatchJsonSnapshot("sorted-series-read-list");
        Object.entries(readList).forEach(comic => {
          expect(comic).toBeAComicSeries();
        });
        done();
      });
    });
  });
};
