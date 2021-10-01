import { Schema, model } from 'mongoose'
const roles = ['admin', 'user', 'moderator']

const schema = new Schema({
    name: {
        type: String,
        // enum: roles,
    }

}, { timestamps: true, versionKey: false })

export const Role = model("Role", schema)