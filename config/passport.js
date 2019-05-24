const passport = require("koa-passport");
const passportJWT = require("passport-jwt");

const ExtractJWT = passportJWT.ExtractJwt;

// const LocalStartegy = require("passport-local");
const JWTStartegy = passportJWT.Strategy;

const config = require("../config");

const {Users} = require("../models/auth");


passport.serializeUser(function(user, done) {
    done(null, user._id)
  })
  
  passport.deserializeUser(function(id, done) {
    Users.findById(id, done);
  })
  

// passport.use(new LocalStartegy({
//     usernameField: "user[email]",
//     passwordField: "user[password]"
// }, (email, password, done) => {
//     Users.findOne({email})
//         .then((user) => {
//             if (err) {
//                 return done(err);
//             }
//             if(!user || !user.validatePassword(password)) {
//                 return done(null, false, {errors: {"email or password": "is invalid"}});
//             }
//             return done(null, user)
//         }).catch(done)
// }));


passport.use(new JWTStartegy(
    {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.SECRET_KEY
    },
    (jwtPaylod, done) => {
        return Users.findOneById(jwtPaylod.id)
            .then(user => {
                return done(null, user);
            })
            .catch(done);
    }));