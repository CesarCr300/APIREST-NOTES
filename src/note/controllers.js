import { Note } from "./model"
import { User } from "../user/model"
import { validationSchema } from "./validation"
import { validate } from "jsonschema"

export const getNotes = async(req, res, next) => {
    try {
        const user = await User.findById(req.idUser).populate("notes")
        const notesByUser = user.notes
        res.status(200).json(notesByUser)
    } catch (err) { res.status(400).json({ err: err.message }) }
}
export const getNote = async(req, res, next) => {
    try {
        const user = await User.findById(req.idUser).populate("notes")
        const { noteId } = req.params
        const note = await Note.findById(noteId)
        return res.status(200).json(note)
    } catch (err) { res.status(404).json({ err: err.message }) }

}
export const postNote = async(req, res, next) => {
    try {
        const user = await User.findById(req.idUser)
        const { title, text } = req.body
        const result = validate({ title, text }, validationSchema)
        if (!result.valid) return res.status(400).json({ error: result.errors.map(error => error.stack) })
        const note = Note({ title, text })
        const savedNote = await note.save()
        await user.notes.push(savedNote)
        await user.save()
        res.status(201).json(savedNote)
    } catch (err) { res.status(400).json({ error: err.message }) }

}
export const updateNote = async(req, res, next) => {
    try {
        const { title, text } = req.body
        const result = validate({ title, text }, validationSchema)
        if (!result.valid) return res.status(400).json({ error: result.errors.map(err => err.stack) })
        const { noteId } = req.params
        const note = await Note.findByIdAndUpdate(noteId, { title, text }, { new: true })
        res.json(note)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }

}
export const destroyNote = async(req, res, next) => {
    try {
        const { noteId } = req.params
        const user = await User.findById(req.idUser)
        const note = await Note.findByIdAndDelete(noteId, { new: true })
        user.notes.splice(noteId, 1)
        await user.save()
        res.json({ note, message: `Note deleted` })
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}