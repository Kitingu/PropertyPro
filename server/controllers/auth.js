const dotenv = require('dotenv')
const Joi = require('@hapi/joi')
const schema = require('../helpers/validator')
const { User } = require('../models/user')
const { encodeToken } = require('../helpers/jwt')
const { hashPassword, compareHash } = require('../helpers/utils')
const jwt = require('jsonwebtoken')
dotenv.config();
const userController = {

    async signUp(req, res) {

        let { firstname, lastname, email, password } = req.body

        let user = User.getUserByEmail(email)
        if (!user) {
            Joi.validate(req.body, schema.user).then(result => {
                let user1 = new User(firstname, lastname, email, password)

                user1.save()
                const token = encodeToken(user1)
                const data = {

                    id: user1.id,
                    firstname: user1.firstname,
                    lastname: user1.lastname,
                    email: user1.email,
                    token

                }
                res.status(201).json({
                    "status": "success",
                    "message": "User registered successfully",
                    data
                })
            }).catch(error => {
                res.status(400).send({
                    "status": "error",
                    "error": error.message
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
