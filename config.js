const dotenv = require("dotenv");

// Get env variables
dotenv.config();

options = {
    PORT: process.env.PORT || 3000,
    DEBUG: process.env.DEBUG !== "production",
    MONGODB_URL: process.env.MONGODB_URL
}

module.exports = options