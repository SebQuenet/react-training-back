const session = require("express-session");
const uuid = require("uuid/v4");
const FileStore = require("session-file-store")(session);

const sessionConfig = {
  genid: req => {
    return uuid(); // use UUIDs for session IDs
  },
  store: new FileStore(),
  secret: "keyboardcat",
  resave: true,
  saveUninitialized: true
};

module.exports = {
  sessionConfig
};
