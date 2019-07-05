const dotenv = require('dotenv')
const Joi = require('@hapi/joi')
const { schema, options } = require('../helpers/validator')
const { User } = require('../models/user')
const { encodeToken } = require('../helpers/jwt')
const { hashPassword, compareHash } = require('../helpers/utils')
const { Response } = require('../helpers/utils')
const userResponse = new Response()
dotenv.config();
const userController = {

    async signUp(req, res) {

        let { firstname, lastname, email, password, isAgent } = req.body
        let user = User.getUserByEmail(email)
        if (!user) {
            Joi.validate(req.body, schema.user, options).then(result => {
                const hashedPassword = hashPassword(password)
                let user1 = new User(firstname, lastname, email, hashedPassword, isAgent)

                user1.save()
                const token = encodeToken(user1)
                const data = {

                    id: user1.id,
                    firstname: user1.firstname,
                    lastname: user1.lastname,
                    email: user1.email,
                    isAgent: user1.isAgent,
                    token

                }
                userResponse.setSuccess(201, 'success', 'User registered successfully', data)
                return userResponse.send(res)
            }).catch(error => {
                userResponse.setError(400, 'failed', error.message)
                return userResponse.send(res)

            })
        }
        else {
            userResponse.setError(409, 'failed', `user with ${email} already exists please login`)
            return userResponse.send(res)
        }
    },

    async login(req, res) {
        const { email, password } = req.body
        if (!email || !password) {
            userResponse.setError(400, 'failed', 'All fields are required')
            return userResponse.send(res)
        }
        const user = User.getUserByEmail(email)
        if (user) {
            if (compareHash(password, user.password)) {
                const token = encodeToken(user)
                userResponse.setSuccess(200, 'success', 'logged in successfully', token)
                return userResponse.send(res)

            }
            else {
                userResponse.setError(401, 'failed', 'Invalid user login credentials')
                return userResponse.send(res)
            }
        }
        else {
            userResponse.setError(400, 'failed', 'user does not exist')
            return userResponse.send(res)
        }


    }
}


module.exports = userController
