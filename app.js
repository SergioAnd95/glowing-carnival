const Koa = require("koa");
const koaBody = require("koa-body");

const config = require("./config");

require("./db")
const app = new Koa();

app.use(koaBody());

app.listen(config.PORT, () => {
    console.log(`Listening: http://localhost:${config.PORT}/`);
});