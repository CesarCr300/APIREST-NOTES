import { Schema, model } from "mongoose"

const schema = new Schema({
    text: { required: true, type: String },
    title: { required: true, type: String },
}, { timestamps: true, versionKey: false })

export const Note = model("Note", schema)