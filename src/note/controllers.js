import { Note } from "./model"
import { User } from "../user/model"

export const getNotes = async(req, res, next) => {
    const user = await User.findById(req.idUser).populate("notes")
    const notesByUser = user.notes
    res.status(200).json(notesByUser)
}
export const getNote = async(req, res, next) => {
    const user = await User.findById(req.idUser).populate("notes")
    const { noteId } = req.params
    const note = await Note.findById(noteId)
    return res.status(200).json(note)
}
export const postNote = async(req, res, next) => {
    const user = await User.findById(req.idUser)
    const { title, text } = req.body
    const note = Note({ title, text })
    const savedNote = await note.save()
    await user.notes.push(savedNote)
    await user.save()
    res.status(201).json(savedNote)
}
export const updateNote = async(req, res, next) => {
    const { title, text } = req.body
    const { noteId } = req.params
    const note = await Note.findByIdAndUpdate(noteId, { title, text }, { new: true })
    res.json(note)
}
export const destroyNote = async(req, res, next) => {
    const { noteId } = req.params
    const user = await User.findById(req.idUser)
    const note = await Note.findByIdAndDelete(noteId, { new: true })
    user.notes.splice(noteId, 1)
    await user.save()
    res.json({ note, message: `Note deleted` })
}