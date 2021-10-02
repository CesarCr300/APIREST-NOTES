import { connectDB } from "./database"
import createRoles from "./libs/initializeRoles"
import config from "./config"
import app from "./app"
console.log(app.get('port'))
app.listen(app.get('port'), () => {
    console.log("Listening")
})