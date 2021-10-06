import { Schema, model } from 'mongoose'
// const roles = ['admin', 'user', 'moderator']
//This is here if in the future I want add new Roles.
const roles = ["user"]

const schema = new Schema({
    name: {
        type: String,
        // enum: roles,
    }

}, { timestamps: true, versionKey: false })

export const Role = model("Role", schema)