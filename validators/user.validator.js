const Joi = require('joi');

const { constants, userRoles } = require('../configs');

const createUserValidator = Joi.object({
    name: Joi
        .string()
        .alphanum()
        .min(2)
        .max(30)
        .trim()
        .required(),
    email: Joi
        .string()
        .regex(constants.EMAIL_REGEXP)
        .trim()
        .required(),
    password: Joi
        .string()
        .regex(constants.PASSWORD_REGEXP)
        .required(),
    role: Joi
        .string()
        .allow(...Object.values(userRoles))
});

const updateUserValidator = Joi.object({
    name: Joi
        .string()
        .alphanum()
        .min(2)
        .max(30)
        .trim()
        .required()
});

module.exports = { createUserValidator, updateUserValidator };
