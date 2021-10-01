import { User } from "../user/model"
export const isUser = async(req, res, next) => {
    const user = await User.find({ _id: req.idUser, notes: req.params.noteId })
    if (user.length === 0) return res.status(404).json({ message: "You need a valid Note-Id" })
    next()
}