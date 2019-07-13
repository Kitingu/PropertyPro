const jwt = require('jsonwebtoken');
const { User } = require('../models/user');
const { Response } = require('../helpers/utils');

const userResponse = new (Response)();
require('dotenv');

const jwtHelper = {

  async verifyToken(req, res, next) {
    // get auth header value

    try {
      const bearerHeader = req.headers.authorization;
      const token = bearerHeader.split(' ')[1];
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      const user = User.getUserByEmail(decoded.user.email);
      req.user = user;
      if (!user) {
        userResponse.setError(400, 'invalid token please sign up');
        return userResponse.send(res);
      }
      next();
    } catch (error) {
      userResponse.setError(400, 'please provide a valid token');
      return userResponse.send(res);
    }
  },
};

module.exports.jwtHelper = jwtHelper;
