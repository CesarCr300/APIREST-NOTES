import { connectDB } from "./database"
import createRoles from "./libs/initializeRoles"
import config from "./config"
import app from "./app"
createRoles()
connectDB()
app.listen(app.get('port'), () => {
    console.log("Listening")
})