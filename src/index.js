import { connectDB } from "./database"
import createRoles from "./libs/initializeRoles"

import app from "./app"
app.listen(process.env.PORT || 3000, () => {
    console.log("Listen")
})