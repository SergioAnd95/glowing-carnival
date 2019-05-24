const Router = require("koa-router");

const {validationMiddleware} = require("../middlewares/validation");

const controllers = require("../controllers/auth");
const {userRegistrationSchema} = require("../schemas/auth");

var router = new Router();


// console.log(userRegistrationSchema);
router.post("/login", controllers.login);
router.post(
    "/registration",
    validationMiddleware(userRegistrationSchema),
    controllers.registration
);

module.exports = router;