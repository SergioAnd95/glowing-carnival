const mongoose = require("mongoose");
const passwordHash = require("password-hash");

const jwt = require("jsonwebtoken");

const config = require("../config");


const UsersSchema = new mongoose.Schema({
    username: {type: String, unique: true},
    password: String,
    email: {type: String, unique: true},
    avatar: {
        type: String,
        get: v => `${v}`,
        required: false
    }
})

UsersSchema.methods.setPassword = function (password) {
    this.password = passwordHash.generate(password, {algorithm:"sha256", saltLength: 16})
}

UsersSchema.methods.verifyPassword = function (password) {
    return passwordHash.verify(password, this.password);
}

UsersSchema.methods.generateJWT = () => {
    return jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username
    }, config.SECRET_KEY, {expiresIn: config.TOKEN_EXPIRATION})
}

module.exports.Users = mongoose.model("Users", UsersSchema)