import { User } from "./model"

export const postUser = async(req, res, next) => {
    const { email, username, password, roles } = req.body;
    const newUser = await User({ email, username, roles })
}
export const generateToken = async(req, res, next) => {}
    // export const updateUser = async(req, res, next) => {}
    // export const destroyUser = async(req, res, next) => {}