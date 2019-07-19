const { Property } = require('../models/property')
const { Response } = require('../helpers/utils');

const userResponse = new (Response)();

const checkDuplicates = async (req, res, next) => {

    const {phonenumber}=req.user
    const { address, price, city } = req.body

    const properties = await Property.checkDuplicates(address, city, price,phonenumber)

    if (properties) {
        userResponse.setError(409, 'Duplicate properties are not allowed');
        return userResponse.send(res);
    }

    next()
}



module.exports = checkDuplicates;
