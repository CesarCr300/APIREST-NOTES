import { Router } from 'express'
import { validateToken } from "../middlewares"
import * as controllers from "./controllers"
const router = Router()

router.route("/")
    .get(validateToken, controllers.getNotes)
    .post(validateToken, controllers.postNote)

router.route("/:noteId")
    .get(controllers.getNote)
    .patch(controllers.updateNote)
    .delete(controllers.destroyNote)

export default router