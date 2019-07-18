const { Property } = require('../models/property')
const { Response } = require('../helpers/utils');

const userResponse = new (Response)();
const checkSold = async (req, res, next) => {
    const { id } = req.params
    const property = await Property.getPropertyByField('propertyId', id)
    if (property.status === 'sold') {
        userResponse.setError(403, 'You are not allowed to update a already sold property');
        return userResponse.send(res);
    }
    next()
};

module.exports = checkSold;
