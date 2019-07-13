const dotenv = require('dotenv');

dotenv.config();
const jwt = require('jsonwebtoken');

const createPayload = (firstname, email, isAgent, isAdmin) => ({
  firstname,
  email,
  isAgent,
  isAdmin,
});
const encodeToken = (user) => {
  const token = jwt.sign({ user }, process.env.SECRET_KEY, { expiresIn: '2 days' });

  return token;
};

module.exports = { encodeToken, createPayload };
