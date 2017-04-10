var _ = require('lodash');
var allSeries20170104 = require('./test-data/all-series-2017-01-04');
var filteredSeries20170104 = require('./test-data/filtered-series-2017-01-04');

module.exports = function (lofcg, newComicsDate) {
  describe('get series list', function () {
    it('should provide no new comic series', function (done) {
      lofcg.newComics.get(undefined, '2017-01-01', { type: lofcg.types.SERIES }, function (err, newComics) {
        expect(err).toBeNull();
        expect(newComics.length).toBe(0);
        expect(newComics).toEqual([]);
        done();
      });
    });

    it('should provide a list of new comic series', function (done) {
      lofcg.newComics.get(undefined, newComicsDate, { type: lofcg.types.SERIES }, function (err, newComics) {
        expect(err).toBeNull();
        expect(newComics.length).toBe(139);
        expect(newComics).toEqual(allSeries20170104);
        _.each(newComics, function (comic) {
          expect(comic).toBeAComicSeries();
        });
        done();
      });
    });

    it('should provide a filtered list of new comic series', function (done) {
      lofcg.newComics.get(undefined, newComicsDate, { type: lofcg.types.SERIES, publishers: ['Image Comics'] }, function (err, newComics) {
        expect(err).toBeNull();
        expect(newComics.length).toBe(8);
        expect(newComics).toEqual(filteredSeries20170104);
        _.each(newComics, function (comic) {
          expect(comic).toBeAComicSeries();
        });
        done();
      });
    });

    it('should return an error when provided with an invalid date', function (done) {
      lofcg.newComics.get(undefined, 'foo', { type: lofcg.types.SERIES }, function (err) {
        expect(err).toEqual(jasmine.any(Error));
        expect(err.message).toEqual('Invalid date value provided');
        done();
      });
    });
  });
};
