import jwt from "jsonwebtoken"
import config from "../config"
import { User } from "../user/model"
export const validateToken = async(req, res, next) => {
    try {
        const token = req.headers["x-access-token"]
        if (!token) return res.json({ message: "You need a token" })
        const decoded = jwt.verify(token, config.JWT_SECRET)
        req.idUser = decoded.id
        const user = await User.findById(req.idUser)
        if (!user) return res.json({ message: `You need a valid token` })
        next()
    } catch (err) {
        res.status(401).json({ message: err.message })
    }
}