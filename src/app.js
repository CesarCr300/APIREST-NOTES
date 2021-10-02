import express from "express";
import morgan from "morgan";

const app = express();

app.use(morgan('tiny'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//routes
import noteRouter from "./note/routes"
import userRouter from "./user/routes"

app.use("/api/notes", noteRouter)
app.use("/api/user", userRouter)
app.get("/", (req, res) => {res.send("Home")})

export default app;
