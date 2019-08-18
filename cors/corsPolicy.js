const originPolicy = (origin, callback) =>
  !origin
    ? callback(null, false)
    : origin.indexOf("127.0.0.1") || origin.indexOf("localhost")
    ? callback(null, true)
    : callback(true, false);

module.exports = {
  originPolicy,
};
