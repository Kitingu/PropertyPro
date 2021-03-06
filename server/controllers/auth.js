const dotenv = require('dotenv');
const { User } = require('../models/user');
const { encodeToken, createPayload } = require('../helpers/jwt');
const { hashPassword, compareHash } = require('../helpers/utils');
const { Response } = require('../helpers/utils');

const userResponse = new Response();
dotenv.config();
const userController = {

  async signUp(req, res) {
    const {
      firstname, lastname, email, password, phoneNumber, isAgent,
    } = req.body;
    const user = await User.getUserByEmail(email);
    if (!user) {
      const hashedPassword = hashPassword(password);
      const user1 = new User(firstname, lastname, email, hashedPassword, phoneNumber, isAgent);

      await user1.save();
      const data = {
        firstname: user1.firstname,
        lastname: user1.lastname,
        email: user1.email,
        phoneNumber: phoneNumber,
        isAgent: user1.isAgent,
        isAdmin: user1.isAdmin,
      };
      const token = encodeToken(
        createPayload(user1.phoneNumber, user1.email, user1.isAgent, user1.isAdmin),
      );
      data.token = token;
      userResponse.setSuccess(201, 'User registered successfully', data);
      return userResponse.send(res);
    }
    else {
      userResponse.setError(409, `user with ${email} already exists please login`);
      return userResponse.send(res);
    }
  },


  async login(req, res) {
    const { email, password } = req.body;
    if (!email) {
      userResponse.setError(400, 'email is required');
      return userResponse.send(res);
    }
    if (!password) {
      userResponse.setError(400, 'password is required');
      return userResponse.send(res);
    }
    const user = await User.getUserByEmail(email);
    if (user) {
      if (compareHash(password, user.password)) {
        const token = encodeToken(createPayload(user.firstname, user.email, user.isAgent, user.isAdmin));
        userResponse.setSuccess(200, 'logged in successfully', token);
        return userResponse.send(res);
      }

      userResponse.setError(401, 'Invalid user login credentials');
      return userResponse.send(res);
    }

    userResponse.setError(400, 'Invalid user login credentials');
    return userResponse.send(res);
  },
};


module.exports = userController;
