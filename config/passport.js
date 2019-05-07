const passport = require("passport");
const LocalStartegy = require("passport-local");

const {Users} = require("../models/auth");


passport.use(new LocalStartegy({
    usernameField: "user[email]",
    passwordField: "user[password]"
}, (email, password, done) => {
    Users.findOne({email})
        .then((user) => {
            if(!user || !user.validatePassword(password)) {
                return done(null, false, {errors: {"email or password": "is invalid"}});
            }
            return done(null, user)
        }).catch
}))