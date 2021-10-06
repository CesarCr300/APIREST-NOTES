process.env.NODE_ENV = "test"
import request from "supertest"
import { connectDB, closeDB } from "../database"
import createRoles from "../libs/initializeRoles"
import { User } from "../user/model"
import app from "../app"
import { Note } from "../note/model"
let auth = {}
let note_id
beforeAll(async() => {
    await connectDB()
    await createRoles()
})
beforeEach(async() => {
    await request(app).post("/api/user").send({
        "password": "secret",
        "username": "testUser",
        "password": "secret",
        "email": "testUser@example.com",
        "roles": ["user"]
    })
    const token = await request(app).get("/api/user/token").send({
        "password": "secret",
        "username": "testUser",
    })
    auth.token = token.body.token
    const note = await request(app)
        .post("/api/notes")
        .send({ "title": "NOTE FROM USER", "text": "note from user" })
        .set("x-access-token", auth.token)
    note_id = note.body._id
})
afterEach(async() => {
    await User.deleteMany({})
    await Note.deleteMany({})
})

afterAll(async() => {
    await closeDB()
})

describe("GET /api/notes", () => {
    test("get notes without token", async() => {
        const response = await request(app).get("/api/notes")
        expect(response.body.message).toBe("You need a token")
        expect(response.status).toBe(401)
    })
    test("get notes with a token", async() => {
        const response = await request(app)
            .get("/api/notes")
            .set("x-access-token", auth.token)

        expect(response.body.length).toBe(1)
        expect(response.body[0]).toHaveProperty("_id")
        expect(response.body[0]).toHaveProperty("title")
        expect(response.body[0]).toHaveProperty("text")
        expect(response.body[0].title).toBe("NOTE FROM USER")
        expect(response.body[0].text).toBe("note from user")
    })
    test("get a note from another person", async() => {
        const response = await request(app)
            .get("/api/notes/100")
            .set("x-access-token", auth.token)
        expect(response.status).toBe(404)
        expect(response.body.message).toBe("You need a valid Note-Id")
    })
    test("get one of your nothes", async() => {
        const response = await request(app)
            .get(`/api/notes/${note_id}`)
            .set("x-access-token", auth.token)
        expect(response.body._id).toBe(note_id)
        expect(response.body.text).toBe("note from user")
        expect(response.body.title).toBe("NOTE FROM USER")
        expect(response.status).toBe(200)
    })
})

describe("POST /api/notes", () => {
    test("create a note without a tokenID", async() => {
        const response = await request(app)
            .post("/api/notes")
            .send({ "title": "TITLE", "text": "Another text" })
        expect(response.body.message).toBe("You need a token")
        expect(response.status).toBe(401)
    })
    test("create a note with a tokenID", async() => {
        const response = await request(app)
            .post("/api/notes")
            .send({ "title": "TITLE", "text": "Another text" })
            .set("x-access-token", auth.token)
        expect(response.body.text).toBe("Another text")
        expect(response.body.title).toBe("TITLE")
        expect(response.status).toBe(201)

        const notes = await request(app)
            .get("/api/notes")
            .set("x-access-token", auth.token)
        expect(notes.body.length).toBe(2)
        expect(notes.body[1]).toHaveProperty("title")
        expect(notes.body[1]).toHaveProperty("text")
        expect(notes.body[1].text).toBe("Another text")
        expect(notes.body[1].title).toBe("TITLE")
    })
})

describe("DELETE /api/notes", () => {
    test("delete a note without a token", async() => {
        const response = await request(app)
            .delete(`/api/notes/${note_id}`)
        expect(response.body.message).toBe("You need a token")
        expect(response.status).toBe(401)
    })
    test("delete a note with a token", async() => {
        const response = await request(app)
            .delete(`/api/notes/${note_id}`)
            .set("x-access-token", auth.token)
        expect(response.body).toHaveProperty("note")
        expect(response.body).toHaveProperty("message")
        expect(response.body.message).toBe("Note deleted")

        const notes = await request(app)
            .get("/api/notes")
            .set("x-access-token", auth.token)
        expect(notes.body.length).toBe(0)
    })
    test("delete a note from another_user/invalid_noteid", async() => {
        const response = await request(app)
            .delete(`/api/notes/anotherId`)
            .set("x-access-token", auth.token)
        expect(response.body.message).toBe("You need a valid Note-Id")
        expect(response.status).toBe(404)
    })
})

describe("PATCH /api/notes", () => {
    test("update a note without a token", async() => {
        const response = await request(app)
            .patch(`/api/notes/${note_id}`)
            .send({ "title": "title updated", "text": "text updated" })

        expect(response.body.message).toBe("You need a token")
        expect(response.status).toBe(401)
    })
    test("update a note with a token but without data", async() => {
        const response = await request(app)
            .patch(`/api/notes/${note_id}`)
            .set("x-access-token", auth.token)
        expect(response.body).toHaveProperty("error")
        expect(response.body.error.length).toBe(2)
    })
    test("update a note with data", async() => {
        const response = await request(app)
            .patch(`/api/notes/${note_id}`)
            .send({ "title": "new title", "text": "new text" })
            .set("x-access-token", auth.token)
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("title")
        expect(response.body).toHaveProperty("text")
        expect(response.body.title).toBe("new title")
        expect(response.body.text).toBe("new text")
    })
})