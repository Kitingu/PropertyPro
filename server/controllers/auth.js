const dotenv = require('dotenv')
const Joi = require('@hapi/joi')
const { schema, options } = require('../helpers/validator')
const { User } = require('../models/user')
const { encodeToken } = require('../helpers/jwt')
const { hashPassword, compareHash } = require('../helpers/utils')
const { Response } = require('../helpers/utils')
const jwt = require('jsonwebtoken')
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
                res.status(400).send({
                    "status": "error",
                    "error": error.details[0].message
                })
            })
        }
        else {
            res.status(409).send({
                "status_code": "error",
                "error": `user with ${email} already exists please login`
            })
        }
    },

    async login(req, res) {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).send({ message: 'All fields are required' });
        }
        const user = User.getUserByEmail(email)
        if (user) {
            if (compareHash(password, user.password)) {
                const token = encodeToken(user)
                res.status(200).json({
                    "status": "success",
                    token

                })

            }
            else {
                res.status(401).send({
                    "status": "error",
                    "error": "Invalid user login credentials",
                    "description": "unauthorized"
                })
            }
        }
        else {
            res.status(400).send({
                "status": "error",
                "error": "user does not exist",
                "description": "bad request"
            })

        }


    }
}


module.exports = userController
