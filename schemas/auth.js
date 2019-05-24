const Joi = require("@hapi/joi");

module.exports.userRegistrationSchema = Joi.object().keys({
    username: Joi.string().required(),
    email: Joi.string().email({minDomainSegments: 2}).required(),
    password: Joi.string().min(6).max(12).required(),
    passwordRepeat: Joi.string().valid(Joi.ref('password')).required().options({ language: { any: { allowOnly: 'must match password' } } })
})