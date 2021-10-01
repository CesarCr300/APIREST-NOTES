import { Role } from "../roles/model"

export default async function() {
    const count = await Role.estimatedDocumentCount()
    if (count > 0) return
    await new Role({ name: "user" }).save()
}