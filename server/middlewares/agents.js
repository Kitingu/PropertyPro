const { Response } = require('../helpers/utils');

const userResponse = new (Response)();

const checkAgent = (req, res, next) => {
  if (!req.user.isAgent === true) {
    userResponse.setError(403, 'Only agents are allowed to perform this task');
    return userResponse.send(res);
  } next();
};


module.exports = checkAgent;
