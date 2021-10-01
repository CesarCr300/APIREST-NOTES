import { Router } from "express"
import { generateToken, postUser } from "./controllers"
const router = Router()

router.route("/")
    .post(postUser)

router.route("/token")
    .get(generateToken)

export default router