module.exports = function(lofcg, newComicsDate) {
  const options = { type: lofcg.types.SERIES };
  const filteredOptions = { publishers: ["Image Comics"], ...options };
  const sortedOptions = { sort: lofcg.sort.DESCENDING, ...options };

  describe("get series list", function() {
    it("should provide no new comic series", function(done) {
      lofcg.newComics.get("1966-01-01", options, (err, newComics) => {
        expect(err).toBeNull();
        expect(newComics).toEqual([]);
        done();
      });
    });

    it("should provide a list of new comic series", function(done) {
      lofcg.newComics.get(newComicsDate, options, (err, newComics) => {
        expect(err).toBeNull();
        expect(newComics).toMatchJsonSnapshot("all-series-2016-01-04");
        Object.entries(newComics).forEach(comic => {
          expect(comic).toBeAComicSeries();
        });
        done();
      });
    });

    it("should provide a filtered list of new comic series", function(done) {
      lofcg.newComics.get(newComicsDate, filteredOptions, (err, newComics) => {
        expect(err).toBeNull();
        expect(newComics).toMatchJsonSnapshot("filtered-series-2016-01-04");
        Object.entries(newComics).forEach(comic => {
          expect(comic).toBeAComicSeries();
        });
        done();
      });
    });

    it("should provide a sorted list of new comic series", function(done) {
      lofcg.newComics.get(newComicsDate, sortedOptions, (err, newComics) => {
        expect(err).toBeNull();
        expect(newComics).toMatchJsonSnapshot("sorted-series-2016-01-04");
        Object.entries(newComics).forEach(comic => {
          expect(comic).toBeAComicSeries();
        });
        done();
      });
    });

    it("should return an error when provided with an invalid date", function(done) {
      lofcg.newComics.get("foo", options, err => {
        expect(err).toEqual(jasmine.any(Error));
        expect(err.message).toEqual("Invalid date value provided");
        done();
      });
    });
  });
};
