const joi = require('@hapi/joi')

const schema = {

    user: joi.object().keys({
        firstname: joi.string().regex(/^[a-zA-Z]+$/).min(3).max(128).required().error(new Error("first name should have at least three alphabetic characters")),
        lastname: joi.string().regex(/^[a-zA-Z]+$/).min(3).max(128).required().error(new Error("last name should have at least three alphabetic characters")),
        email: joi.string().regex(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/).required().error(new Error("please provide a valid email")),
        password: joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,128}$/)
            .required().error(new Error("password should have atleast a uppercase,lowercase a number and a special character"))
    }),

    property: joi.object().keys({
        state: joi.string().regex(/^[a-zA-Z]+$/).min(3).max(128).required(),
        city: joi.string().regex(/^[a-zA-Z]+$/).min(3).max(128).required(),
        price: joi.string().regex(/^[0-9]+$/).min(3).max(128).required(),
        type: joi.string().regex(/^[a-zA-Z]+$/).min(3).max(128).required(),
        address: joi.string().regex(/^[0-9]+$/).min(3).max(128).required(),
        contact: joi.string().regex(/^[0-9]+$/).min(10).max(13)
            .required()
    })
}

module.exports = schema
