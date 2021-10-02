import { connectDB } from "./database"
import createRoles from "./libs/initializeRoles"
import config from "./config"
import app from "./app"

app.listen(config.PORT, () => {
    console.log("Listen")
})