/* eslint-disable no-console */
const lofcg = require("../");

const myUserId = 26853; // alistairjcbrown
const theirUserId = 18979; // midian

// Get new comics for next week
lofcg.collection.get(
  myUserId,
  { type: lofcg.types.SERIES },
  (errMine, myCollection) => {
    if (errMine) {
      console.log("An error has occurred getting collection:", errMine);
      return;
    }

    lofcg.collection.get(
      theirUserId,
      { type: lofcg.types.SERIES },
      (errTheirs, theirCollection) => {
        if (errTheirs) {
          console.log("An error has occurred getting collection:", errTheirs);
          return;
        }

        const seriesWeHaveInCommon = [
          myCollection,
          theirCollection
        ].reduce((a, b) => a.filter(c => b.id.includes(c.id)));

        console.log(seriesWeHaveInCommon);
      }
    );
  }
);
