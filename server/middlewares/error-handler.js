const Joi = require('@hapi/joi');
const { Response } = require('../helpers/utils');

const userResponse = new Response();
const handlers = {
  async handle404(req, res, next) {
    const error = new Error('Resource not found');
    error.status = 404;
    next(error);
  },
  async handle500(error, req, res, next) {
    res.status(error.status || 500);
    userResponse.setError(error.status || 500, error.message);
    return userResponse.send(res);
  },
  async methodNotAllowed(req, res, next) {
    const error = new Error('This method is not allowed');
    error.status = 405;
    next(error);
  },


};


const checkIdType = (req, res, next) => {
  const schema = Joi.number().error(() => 'id should only be a string');
  const { id } = req.params;
  const { error } = Joi.validate(id, schema);
  if (error) {
    userResponse.setError(400, 'property id should only be a number');
    return userResponse.send(res);
  }
  next();
};
module.exports = { handlers, checkIdType };
