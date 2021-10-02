require("dotenv").config()

export default {
    JWT_SECRET: process.env.JWT_SECRET,
    MONGOOSE_URL: process.env.MONGOOSE_URL,
    PORT: process.env.PORT,
}