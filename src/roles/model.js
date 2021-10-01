import { Schema, models } from 'mongoose'
const roles = ['admin', 'user', 'moderator']

const schema = new Schema({
    name: {
        required: true,
        type: Array,
        enum: roles,
    }

}, { timestamps: true, versionKey: false })

export const Roles = model("Role", schema)