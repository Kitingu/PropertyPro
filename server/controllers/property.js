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
    },

    async getAll(req, res) {
        const allProperties = Property.getAllProperties()
        if (allProperties.length < 1) {
            res.status(200).send({
                "status": "success",
                "data": allProperties,
                "description": "no available properties at the moment"
            })
        }
        else {
            res.status(200).send({
                "status": "success",
                "data": allProperties
            })
        }
    },
    async getSpecificAdvert(req, res) {
        const { id } = req.params
        const property = Property.getPropertybyId(parseInt(id))
        if (property) {
            res.status(200).send({
                "status": "success",
                "data": property
            })
        }
        else {
            res.status(404).send({
                status: "failed",
                error: "resource not found",
                description: `A property with id${id} does not exist`

            })
        }
    }
}
module.exports = propertyController
