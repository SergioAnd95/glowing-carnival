const Router = require("koa-router");

const controllers = require("../controllers/auth");

var router = new Router();

router.post("/login", controllers.postLogin);

module.exports = router;