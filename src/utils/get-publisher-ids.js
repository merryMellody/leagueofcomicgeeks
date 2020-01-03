const publishers = require("./publishers");

module.exports = function(publisherNames) {
  if (!Array.isArray(publisherNames)) return [];

  return publisherNames
    .map(publisherName => publishers[publisherName])
    .filter(Boolean);
};
