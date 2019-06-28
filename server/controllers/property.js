require('dotenv')
const Joi = require('@hapi/joi')
const schema = require('../helpers/validator')
const { Property, properties } = require('../models/property')


const propertyController = {
    async createProperty(req, res) {

        const ownerEmail = req.user.email
        const { status, state, city, type, price, address, contact } = req.body

        let result = Joi.validate(req.body, schema.property)

        if (result.error) {
            res.status(400).send({
                error: result.error.details[0].message
            })

        }
        else {
            try {
                let imgPath = await req.file.url
                const property = new Property(status, state, city, type, price, address, contact, imgPath, ownerEmail)
                property.save()
                res.status(201).send(property)

            } catch (error) {
                res.status(400).send({
                    "status": "failed",
                    "error": "please provide an image of type png, gif or jpg"
                })
            }

        }
    }
}
module.exports = propertyController
