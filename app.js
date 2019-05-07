const Koa = require("koa");
const koaBody = require("koa-body");

const routers = require("./routes")
const config = require("./config");
const auth_middlewares = require("./middlewares/auth");

require("./config/db");
require("./config/passport");

const app = new Koa();

app
   .use(koaBody())
   .use(auth_middlewares.authMiddleware)
   .use(routers.routes());

app.listen(config.PORT, () => {
    console.log(`Listening: http://localhost:${config.PORT}/`);
});