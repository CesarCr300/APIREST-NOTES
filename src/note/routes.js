import { Router } from 'express'
import * as controllers from "./controllers"
const router = Router()

router.route("/")
    .get(controllers.getNotes)
    .post(controllers.postNote)

router.route("/:noteId")
    .get(controllers.getNote)
    .patch(controllers.updateNote)
    .delete(controllers.destroyNote)

export default router