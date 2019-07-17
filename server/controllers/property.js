require('dotenv');
const { Property } = require('../models/property');
const { checkOwner, Response } = require('../helpers/utils');

const userResponse = new Response();
const propertyController = {
  async createProperty(req, res) {
    const ownerEmail = req.user.email;
    const {
      state, city, type, price, address, contact,
    } = req.body;

    try {
      const imgPath = req.file.url;
      const property = new Property(state, city, type,
        price, address, contact, imgPath, ownerEmail);

      await property.save();
      userResponse.setSuccess(201, 'property advert created successfully', property);
      return userResponse.send(res);
    } catch (error) {
      userResponse.setError(400, 'please provide an image of type png, gif or jpg');
      return userResponse.send(res);
    }
  },

  async getAll(req, res) {
    const allProperties = await Property.getAllProperties();

    const { type } = req.query;
    if (type) {
      const results = Property.queryByType(type);

      if (results.length) {
        userResponse.setSuccess(200, 'properties fetched successfully', results);
        return userResponse.send(res);
      }
      userResponse.setError(404, 'couldnt find anything that matches the filters');
      return userResponse.send(res);
    }
    if (!allProperties.length) {
      userResponse.setSuccess(200, 'no available properties at the moment', allProperties);
      return userResponse.send(res);
    }

    userResponse.setSuccess(200, 'properties fetched successfully', allProperties);
    return userResponse.send(res);
  },
  async getSpecificAdvert(req, res) {
    const { id } = req.params;
    const property = await Property.getPropertybyId(parseInt(id));
    if (property) {
      userResponse.setSuccess(200, 'property advert fetched successfully', property);
      return userResponse.send(res);
    }

    userResponse.setError(404, `A property with id ${id} does not exist`);
    return userResponse.send(res);
  },
  async deleteProperty(req, res) {
    const { id } = req.params;
    const property = Property.getPropertybyId(parseInt(id));
    if (property) {
      const owner = req.user.email;
      if (owner === property.owner) {
        Property.deleteProperty(id);
        userResponse.setSuccess(200, 'advert deleted successfully', null);
        userResponse.send(res);
      } else {
        userResponse.setError(401, 'you dont have the privilege to perform this task');
        return userResponse.send(res);
      }
    } else {
      userResponse.setError(404, `A property with id${id} does not exist`);
      return userResponse.send(res);
    }
  },
  async changeStatus(req, res) {
    const { id } = req.params;
    const property = Property.getPropertybyId(parseInt(id));
    if (property) {
      if (checkOwner(req, property)) {
        Property.changePropertyStatus(property);
        userResponse.setSuccess(200, 'property advert updated successfully', property);
        return userResponse.send(res);
      }

      userResponse.setError(401, 'you dont have the privilege to perform this task');
      return userResponse.send(res);
    }

    res.status(404).send({
      status: 'failed',
      error: 'resource not found',
      description: `A property with id ${id} does not exist`,

    });
  },
  async updatePrice(req, res) {
    const { id } = req.params;
    const property = Property.getPropertybyId(parseInt(id));
    const { price } = req.body;
    if (property) {
      if (checkOwner(req, property)) {
        Property.updatePrice(property, price);
        userResponse.setSuccess('200', 'Property updated successfully', property);
        return userResponse.send(res);
      }

      userResponse.setError('401', 'you dont have the privilege to perform this task');
      return userResponse.send(res);
    }

    userResponse.setError('404', `A property with id ${id} does not exist`);
    return userResponse.send(res);
  },
  async flagProperty(req, res) {
    const { id } = req.params;
    const property = Property.getPropertybyId(parseInt(id));
    const { reason, description } = req.body;

    if (property) {
      if (checkOwner(req, property)) {
        userResponse.setError('403', 'you can not flag your own property');
        return userResponse.send(res);
      }

      const owner = req.user.userId;
      Property.flagProperty(owner, property, reason, description);
      userResponse.setSuccess('200', 'Property flagged successfully', null);
      return userResponse.send(res);
    }
    userResponse.setError('404', 'property does not exist');
    return userResponse.send(res);
  },
};
module.exports = propertyController;
