require('dotenv')
const Joi = require('@hapi/joi')
const schema = require('../helpers/validator')
const { User } = require('../models/user')
const userController = {

    async signUp(req, res) {

        let { firstname, lastname, email, password } = req.body

        let user = User.getUserByEmail(email)
        if (!user) {
            Joi.validate(req.body, schema.user).then(result => {
                let user1 = new User(firstname, lastname, email, password)
                user1.save()
                res.status(201).json({
                    "status": "success",
                    "message": "User registered successfully",
                    "data": user1
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
    }
}


module.exports = userController
