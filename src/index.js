import { connectDB } from "./database"
import createRoles from "./libs/initializeRoles"
createRoles()

import app from "./app"
app.listen(3000, () => {
    console.log("Listen")
})