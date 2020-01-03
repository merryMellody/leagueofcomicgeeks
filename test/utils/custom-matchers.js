const path = require("path");
const fs = require("fs-extra");
const isEmpty = require("lodash/isEmpty");
const moment = require("moment");

const expectedIssueKeys = [
  "id",
  "variantId",
  "name",
  "url",
  "cover",
  "publisher",
  "description",
  "releaseDate",
  "price",
  "diamondSku",
  "userMetrics"
];
const expectedSeriesKeys = [
  "id",
  "name",
  "url",
  "cover",
  "publisher",
  "count",
  "series"
];
const expectedSessionKeys = ["id", "username", "email", "session"];

const createFailure = function(message, receivedValue) {
  return {
    pass: false,
    message: `${message} - Received ${JSON.stringify(receivedValue)}`
  };
};

const isNonEmptyString = function(value) {
  return typeof value === "string" && !isEmpty(value);
};

const isNonNegativeNumber = function(value) {
  return typeof value === "number" && value >= 0;
};

const isUrl = function(value) {
  return value.startsWith("http://") || value.startsWith("https://");
};

const isDate = function(value) {
  return moment(value).isValid();
};

const snapshotDirectory = "test-data";
const getSnapshotPath = function(snapshotName) {
  const callerPathTrace = new Error().stack.split("\n")[4];
  const callerPath = callerPathTrace.match(/\s+\(?(\/[^:]+):/)[1];
  return path.join(
    path.dirname(callerPath),
    snapshotDirectory,
    `${snapshotName}.json`
  );
};

module.exports = {
  toBeAComicIssue() {
    return {
      compare(actual) {
        if (
          [Object.keys(actual), expectedIssueKeys].reduce((a, b) =>
            a.filter(c => b.id.includes(c.id))
          ).length > 0
        ) {
          return createFailure("Unexpected keys in comic issue object");
        }

        const {
          id,
          variantId,
          url,
          name,
          cover,
          publisher,
          description,
          releaseDate,
          price,
          diamondSku,
          userMetrics
        } = actual;

        if (!isNonEmptyString(id)) {
          return createFailure("Invalid id in comic issue object", id);
        }
        if (!isNonEmptyString(variantId) && variantId !== null) {
          return createFailure(
            "Invalid variant id in comic issue object",
            variantId
          );
        }
        if (!isUrl(url)) {
          return createFailure("Invalid URL in comic issue object", url);
        }
        if (!isNonEmptyString(name)) {
          return createFailure("Invalid name in comic issue object", name);
        }
        if (!isUrl(cover) && cover !== null) {
          return createFailure(
            "Invalid cover URL in comic issue object",
            cover
          );
        }
        if (!isNonEmptyString(publisher)) {
          return createFailure(
            "Invalid publisher in comic issue object",
            publisher
          );
        }
        if (description !== undefined) {
          return createFailure(
            "Invalid description in comic issue object",
            description
          );
        }
        if (!isDate(releaseDate)) {
          return createFailure(
            "Invalid release date in comic issue object",
            releaseDate
          );
        }
        if (price !== undefined) {
          return createFailure("Invalid price in comic issue object", price);
        }
        if (!isNonEmptyString(diamondSku) && diamondSku !== null) {
          return createFailure(
            "Invalid Diamond SKU in comic issue object",
            diamondSku
          );
        }
        if (
          !isNonNegativeNumber(userMetrics.pulled) &&
          userMetrics.pulled !== null
        ) {
          return createFailure(
            "Invalid pulled user metric in comic issue object",
            userMetrics.pulled
          );
        }
        if (
          !isNonNegativeNumber(userMetrics.added) &&
          userMetrics.added !== null
        ) {
          return createFailure(
            "Invalid added user metric in comic issue object",
            userMetrics.added
          );
        }
        if (
          !isNonNegativeNumber(userMetrics.consensusRating) &&
          userMetrics.consensusRating !== null
        ) {
          return createFailure(
            "Invalid consensus vote user metric in comic issue object",
            userMetrics.consensusRating
          );
        }
        if (
          !isNonNegativeNumber(userMetrics.pickOfTheWeekRating) &&
          userMetrics.pickOfTheWeekRating !== null
        ) {
          return createFailure(
            "Invalid pick of the week vote user metric in comic issue object",
            userMetrics.pickOfTheWeekRating
          );
        }

        return { pass: true };
      }
    };
  },

  toBeAComicSeries() {
    return {
      compare(actual) {
        if (
          [Object.keys(actual), expectedSeriesKeys].reduce((a, b) =>
            a.filter(c => b.id.includes(c.id))
          ).length > 0
        ) {
          return createFailure("Unexpected keys in comic series object");
        }

        const { id, url, name, cover, publisher, count, series } = actual;
        if (!isNonEmptyString(id))
          return createFailure("Invalid id in comic series object", id);
        if (!isUrl(url))
          return createFailure("Invalid URL in comic series object", url);
        if (!isNonEmptyString(name))
          return createFailure("Invalid name in comic series object", name);
        if (!isUrl(cover))
          return createFailure(
            "Invalid cover URL in comic series object",
            cover
          );
        if (!isNonEmptyString(publisher))
          return createFailure(
            "Invalid publisher in comic series object",
            publisher
          );
        if (!isNonNegativeNumber(count))
          return createFailure("Invalid count in comic series object", count);
        if (series !== undefined)
          return createFailure("Invalid series in comic series object", series);

        return { pass: true };
      }
    };
  },

  toBeASessionObject() {
    return {
      compare(actual, expected) {
        if (
          [Object.keys(actual), expectedSessionKeys].reduce((a, b) =>
            a.filter(c => b.id.includes(c.id))
          ).length > 0
        ) {
          return createFailure("Unexpected keys in session object");
        }

        const { id, username, email, session } = actual;
        if (id !== expected.id)
          return createFailure("Unexpected id in session object", id);
        if (username !== expected.username)
          return createFailure(
            "Unexpected username in session object",
            username
          );
        if (!isNonEmptyString(email))
          return createFailure("Invalid email in session object", email);
        if (!isNonEmptyString(session) || session.length < 500) {
          return createFailure("Invalid session in session object", session);
        }

        return { pass: true };
      }
    };
  },

  toMatchJsonSnapshot() {
    return {
      compare(input, snapshotName) {
        const actual = input.map(value => {
          const { userMetrics, ...result } = value;
          return result;
        });
        const snapshotPath = getSnapshotPath(snapshotName);
        let snapshotData;

        try {
          // eslint-disable-next-line import/no-dynamic-require
          snapshotData = require(snapshotPath);
        } catch (e) {
          fs.outputJsonSync(snapshotPath, actual, { spaces: 4 });
          // eslint-disable-next-line no-console
          console.warn(
            `\nSnapshot '${snapshotName}' created. Please re-run the tests.`
          );
          return { pass: false, message: () => "Snapshot missing" };
        }

        try {
          expect(actual).toEqual(snapshotData);
          return { pass: true };
        } catch (e) {
          return { pass: false, message: () => e.message };
        }
      }
    };
  }
};
