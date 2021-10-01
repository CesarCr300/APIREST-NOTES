import { Router } from 'express'
import { validateToken, isUser } from "../middlewares"
import * as controllers from "./controllers"

const router = Router()

router.use(validateToken)

router.route("/")
    .get(controllers.getNotes)
    .post(controllers.postNote)

router.route("/:noteId")
    .get(isUser, controllers.getNote)
    .patch(isUser, controllers.updateNote)
    .delete(isUser, controllers.destroyNote)

export default router