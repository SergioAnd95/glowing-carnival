const Joi = require("@hapi/joi");


module.exports.validationMiddleware = (schema) => {

    // Middleware for validate schema
    
    return async (ctx, next) => {
        try {
            var data = await Joi.validate(ctx.request.body, schema, {abortEarly: false})
        } catch (err) {
            var err_obj = {};
            for (let i of err.details) {
                err_obj[i.path[0]] = i.message
            }

            ctx.status = 401
            return ctx.response.body = err_obj;

        }

        ctx.validated_data = data
        return next()
    }
}