const types = require("./types");

module.exports = function(wrappedFunction) {
  return function(...args) {
    const argsCount = args.length;
    const lastArg = args[argsCount - 1];
    const penultimateArg = args[argsCount - 2];

    if (
      !(typeof penultimateArg === "object") &&
      typeof lastArg === "function"
    ) {
      const defaultedOptions = { type: types.ISSUE };
      args.splice(argsCount - 1, 0, defaultedOptions);
    }

    if (
      typeof penultimateArg === "object" &&
      typeof lastArg === "function" &&
      penultimateArg.type === undefined
    ) {
      penultimateArg.type = types.ISSUE;
    }

    return wrappedFunction(...args);
  };
};
