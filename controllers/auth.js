const Joi = require("@hapi/joi");

const {UserRegistrationSchema} = require("../schemas/auth");
const {Users} = require("../models/auth");

module.exports.login = (ctx, next) => {
    return ctx.response.body = "Hello!"
}

module.exports.registration = async (ctx, next) => {
    let data = ctx.validated_data;
    let user = new Users(
        {
            username: data.username,
            email: data.email
        }
    );
    user.setPassword(data.password);
    //console.log(user)
    try {
        await user.save();
    } catch (err) {
        console.log(err);
    }
    return ctx.response.body ={"msg": "User created success"};
}