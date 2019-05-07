const Router = require("koa-router");

const auth = require("./auth");


const routers = new Router();

routers.use("/auth", auth.routes(), auth.allowedMethods());

module.exports = routers