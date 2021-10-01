import { User } from "./model"
import { Role } from "../roles/model"
import jwt from "jsonwebtoken"
import config from "../config"

export const postUser = async(req, res, next) => {
    const { email, username, password, roles } = req.body;
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
}
export const generateToken = async(req, res, next) => {
    const { username, password, } = req.body;
    let user = await User.findOne({ username });
    const isUser = await User.comparePassword(password, user.password)

    if (!isUser) return res.status(401).json({ "message": "Username or password are not corrects" })

    const token = await jwt.sign({ id: user._id }, config.JWT_SECRET, { expiresIn: 60 * 60 * 24 })
    res.json(token)
}

// export const updateUser = async(req, res, next) => {}
// export const destroyUser = async(req, res, next) => {}