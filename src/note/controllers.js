import { Note } from "./model"

export const getNotes = async(req, res, next) => {
    const notes = await Note.find()
    res.status(200).json(notes)
}
export const getNote = async(req, res, next) => {
    const { noteId } = req.params
    const note = await Note.findById(noteId)
    res.status(200).json(note)
}
export const postNote = async(req, res, next) => {
    const { title, text } = req.body
    const note = Note({ title, text })
    const savedNote = await note.save()
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
    const note = await Note.findByIdAndDelete(noteId, { new: true })
    res.json({ note, message: `Note deleted` })
}