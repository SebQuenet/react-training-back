const axios = require("axios");

const DBJSON_PORT = 3143;

const { DBJSON_URL} = require('../config');

const serializer = (user, done) => done(null, user.id);

const deserializer = (async (id, done) => {
  try {
    const res = await axios.get(`${DBJSON_URL}/users/${id}`);
    console.log(res.data);
    done(null, res.data);
  } catch (error) {
    done(error, false);
  }
});

module.exports = {
  serializer,
  deserializer,
};
