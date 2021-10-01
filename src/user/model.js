import { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'

const schema = new Schema({
    email: {
        required: true,
        type: String,
        unique: true,
    },
    username: {
        required: true,
        type: String,
        unique: true
    },
    password: {
        required: true,
        type: String,
        unique: true
    },
    roles: [{ ref: "Role", type: Schema.Types.ObjectId }],
    notes: [{ ref: "Note", type: Schema.Types.ObjectId }]
}, { timestamps: true, versionKey: false })

schema.statics.createPassword = async function(password) {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

schema.statics.comparePassword = async function(password, originalPassword) {
    return await bcrypt.compare(password, originalPassword)
}
export const User = model("User", schema)