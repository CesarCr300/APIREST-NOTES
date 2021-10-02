import { connectDB } from "./database"
import createRoles from "./libs/initializeRoles"
import config from "./config"
import app from "./app"

app.listen(config.PORT || 3000, () => {
    console.log("Listen")
})