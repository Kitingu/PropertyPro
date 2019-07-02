require('dotenv')
const Joi = require('@hapi/joi')
const { schema, options } = require('../helpers/validator')
const { Property, properties } = require('../models/property')
const { checkOwner, Response } = require('../helpers/utils')
const userResponse = new Response()
const propertyController = {
    async createProperty(req, res) {

        const ownerEmail = req.user.email
        const { state, city, type, price, address, contact } = req.body

        let result = Joi.validate(req.body, schema.property)

        if (result.error) {
            res.status(400).send({
                error: result.error.details[0].message
            })

        }
        else {
            try {
                let imgPath = await req.file.url
                const property = new Property(state, city, type, price, address, contact, imgPath, ownerEmail)
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
    },
    async deleteProperty(req, res) {
        const { id } = req.params
        const property = Property.getPropertybyId(parseInt(id))
        if (property) {
            const owner = req.user.email
            if (owner === property.owner) {
                Property.deleteProperty(id)
                res.status(200).send({
                    "status": "success",
                    "data": { "message": "advert delete successfully" }
                })
            }
            else {
                res.status(401).send({
                    status: "failed",
                    error: "you dont have the privilege to perform this task",
                    description: "not allowed"

                })
            }


        }
        else {
            res.status(404).send({
                status: "failed",
                error: "resource not found",
                description: `A property with id${id} does not exist`

            })
        }
    },
    async changeStatus(req, res) {
        const { id } = req.params
        const property = Property.getPropertybyId(parseInt(id))
        if (property) {
            if (checkOwner(req, property)) {
                Property.changePropertyStatus(property)
                res.status(200).send({
                    data: property
                })
            }
            else
                res.status(401).send({
                    status: "failed",
                    error: "you dont have the privilege to perform this task",
                    description: "not allowed"

                })
        }
        else {
            res.status(404).send({
                status: "failed",
                error: "resource not found",
                description: `A property with id ${id} does not exist`

            })
        }
    },
    async updatePrice(req, res) {
        const { id } = req.params
        const property = Property.getPropertybyId(parseInt(id))

        let result = Joi.validate(req.body, schema.priceUpdate, options)
        if (result.error) {
            userResponse.setError('400', 'failed', result.error.details[0].message)
            return userResponse.send(res)
        }
        const price = req.body.price
        if (property) {
            if (checkOwner(req, property)) {
                Property.updatePrice(property, price)
                userResponse.setSuccess('200', 'success', "Property updated successfully", property)
                return userResponse.send(res)
            }
            else {
                userResponse.setError('401', 'failed', "you dont have the privilege to perform this task")
                return userResponse.send(res)
            }

        }
        else {
            userResponse.setError('404', 'failed', `A property with id ${id} does not exist`)
            return userResponse.send(res)

        }
    }
}
module.exports = propertyController
