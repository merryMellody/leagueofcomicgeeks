/* eslint-disable no-console */
const flattenDeep = require("lodash/flattenDeep");
const orderBy = require("lodash/orderBy");
const moment = require("moment");
const lofcg = require("../");

const weeks = 10;
const wednesday = moment().day(3);
const filter = "star wars";
const range = [...Array(weeks).keys()];
const data = [];

const filterUnwanted = function(list) {
  const tradePaperback = " tp";
  const hardCover = " hc";
  const graphicNovel = " gn";
  const boxSet = " box set";
  const variant = " variant";
  return list.filter(function({ name = "", variantId }) {
    const matches = name.match(/#\d+\w?(.*)?/i);
    return (
      !name.toLowerCase().endsWith(tradePaperback) &&
      !name.toLowerCase().endsWith(hardCover) &&
      !name.toLowerCase().endsWith(graphicNovel) &&
      !name.toLowerCase().endsWith(boxSet) &&
      !name.toLowerCase().endsWith(variant) &&
      (matches === null || matches[1] === undefined) &&
      variantId === null
    );
  });
};

const outputresults = function(list) {
  if (list.length < range.length) return;

  const starWarsComics = flattenDeep(list).filter(
    ({ name = "" }) => name.toLowerCase().indexOf(filter) > -1
  );
  const mainIssues = orderBy(
    filterUnwanted(starWarsComics),
    ["name", "releaseDate"],
    ["asc", "asc"]
  );

  // console.log(JSON.stringify(mainIssues, null, 4));
  Object.entries(mainIssues).forEach(function({ releaseDate, name, url }) {
    console.log(`[${releaseDate}] ${name.padEnd(50)} --   ${url}`);
  });
};

range.forEach(function(count) {
  const date = wednesday
    .clone()
    .add(count, "weeks")
    .format("YYYY-MM-DD");

  // Get new comics
  lofcg.newComics.get(date, (err, newComics) => {
    if (err) {
      data.push(err);
      console.log("An error has occurred getting new comics:", err);
      return;
    }

    data.push(newComics);
    outputresults(data);
  });
});
