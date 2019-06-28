const { User } = require('../models/user')
const jwt = require('jsonwebtoken')
require('dotenv')

const jwtHelper = {

    async verifyToken(req, res, next) {
        // get auth header value

        try {

            const bearerHeader = req.headers['authorization']
            const token = bearerHeader.split(' ')[1]
            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            const user = User.getUserByEmail(decoded.user.email)
            req.user = user
            if (!user) {
                return res.status(400).send({ message: 'Invalid Token' });
            }
            next()


        }
        catch (error) {
            return res.status(400).send({ message: 'Invalid Token' });
        }


    }
}

module.exports.jwtHelper = jwtHelper
