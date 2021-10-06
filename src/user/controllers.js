import { User } from "./model"
import { Role } from "../roles/model"
import jwt from "jsonwebtoken"
import config from "../config"
import { validate } from "jsonschema"
import { validationSchema } from "./validation"

export const postUser = async(req, res, next) => {
    try {
        const { email, username, password, roles } = req.body;
        const result = validate({ email, username, password, roles }, validationSchema)
        if (!result.valid) return res.json({ error: result.errors.map(error => error.stack) })
        let newUser = await User({
            email,
            username,
            password: await User.createPassword(password),
        })
        if (roles) {
            const rolesForUser = await Role.find({ name: { $in: roles } })
            newUser.roles = rolesForUser.map(role => role._id)
        } else {
            newUser.roles = Role.findOne({ name: "user" })
        }
        await newUser.save()
        res.json(newUser)
    } catch (err) {
        res.status(400).json({ err: err.message })
    }
}
export const generateToken = async(req, res, next) => {
    try {
        const { username, password, } = req.body;
        let user = await User.findOne({ username });
        const isUser = await User.comparePassword(password, user.password)

        if (!isUser) return res.status(401).json({ "message": "Username or password are not corrects" })

        const token = await jwt.sign({ id: user._id }, config.JWT_SECRET, { expiresIn: 60 * 60 * 24 })
        res.json({ token })
    } catch (err) {
        res.status(401).json({ err: err.message })
    }
}