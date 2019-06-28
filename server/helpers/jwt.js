const dotenv = require('dotenv')
dotenv.config();
const jwt = require('jsonwebtoken')


const encodeToken = (user) => {
    const token = jwt.sign({ user }, process.env.SECRET_KEY, { expiresIn: '2 days' })

    return token

}

module.exports.encodeToken = encodeToken
