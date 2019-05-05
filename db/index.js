const mongoose = require("mongoose");

const config = require("../config");


mongoose.Promise = global.Promise;

mongoose.connect(config.MONGODB_URL, {userNewUrlParser: true})
.catch((e) => console.error(e));
const db = mongoose.connection;

// Check connection
db.on("connected", () => {
    console.log(`Mongoose connected to db`)
});

// Check for DB errors
db.on("error", (err) => {console.error(err)});


// Check disconected
db.on("disconnected", () => {
    console.log("mogoose connection disconnected");
});

process.on("SIGINT", () => {
    db.close(() => {
        console.log("mogoose connection closed throw app termination");
        process.exit(0);
    });
});