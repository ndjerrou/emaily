if (process.env.NODE_ENV === "production") {
  // return the correct set of keys else we are in dev mode
  module.exports = require("./prod.js");
} else {
  module.exports = require("./dev");
}
