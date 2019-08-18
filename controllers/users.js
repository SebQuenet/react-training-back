const axios = require("axios");
const { DBJSON_URL, PUBLIC_URL } = require("../config");

const allUsers = async (req, res) => {
  const users = await axios.get(`${DBJSON_URL}/users`);

  res.send(users.data.map(user => ({
    id: user.id,
    email: user.email,
    name: user.name,
    avatar: `${PUBLIC_URL}/${user.avatar}`
  })));
};

const currentUser = (req, res) => {
  const {
    user: { id, email, name, avatar }
  } = req;
  res.send({
    id,
    email,
    name,
    avatar: `${PUBLIC_URL}/${avatar}`
  });
};

const getOne = async (req, res) => {
  const {
    params: { id }
  } = req;
  const userWithId = await axios.get(`${DBJSON_URL}/users?id=${id}`);
  const foundUser = userWithId.data[0];
  if (foundUser) {
    const {id, email, name, avatar} = foundUser;
    res.send({
      id,
      email,
      name,
      avatar: `${PUBLIC_URL}/${avatar}`,
    });
  } else {
    res.status(404).send({error: 'User not found', id})
  }
};

module.exports = {
  currentUser,
  allUsers,
  getOne,
};
