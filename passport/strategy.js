const LocalStrategy = require("passport-local").Strategy;
const axios = require("axios");
const bcrypt = require("bcrypt-nodejs");

const { DBJSON_URL } = require('../config');

const localStrategy = new LocalStrategy(
  { usernameField: "email" },
  async (email, password, done) => {
    try {
      const res = await axios.get(
        `${DBJSON_URL}/users?email=${email}`
      );
      const user = res.data[0];
      if (!user) {
        return done(null, false, { error: "Invalid credentials." });
      }
      if (!bcrypt.compareSync(password, user.password)) {
        return done(null, false, { error: "Invalid credentials." });
      }
      return done(null, user);
    } catch (error) {
      done(error);
    }
  }
);

module.exports = {
  localStrategy
};
