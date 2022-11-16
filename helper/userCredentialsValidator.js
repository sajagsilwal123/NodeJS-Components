const Joi = require('Joi');


const schema = Joi.object({
    username: Joi
        .string()
        .min(6)
        .max(30)
        .required(),

    email: Joi
        .string()
        .email()
        .lowercase()
        .required(),

    password: Joi
        .string()
        .min(8)
        .max(30)
        .regex(/[a-zA-Z0-9]{3,30}/)
        .required(),

    first_name: Joi
        .string()
        .min(4)
        .max(20)
        .required(),

    last_name: Joi
        .string()
        .min(3)
        .max(20)
        .required()
})

 
module.exports = schema