"use strict";

var _supertest = _interopRequireDefault(require("supertest"));

var _database = require("../database");

var _initializeRoles = _interopRequireDefault(require("../libs/initializeRoles"));

var _model = require("../user/model");

var _app = _interopRequireDefault(require("../app"));

var _model2 = require("../note/model");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

process.env.NODE_ENV = "test";
var auth = {};
var note_id;
beforeAll( /*#__PURE__*/_asyncToGenerator(function* () {
  yield (0, _database.connectDB)();
  yield (0, _initializeRoles.default)();
}));
beforeEach( /*#__PURE__*/_asyncToGenerator(function* () {
  yield (0, _supertest.default)(_app.default).post("/api/user").send({
    "password": "secret",
    "username": "testUser",
    "password": "secret",
    "email": "testUser@example.com",
    "roles": ["user"]
  });
  var token = yield (0, _supertest.default)(_app.default).get("/api/user/token").send({
    "password": "secret",
    "username": "testUser"
  });
  auth.token = token.body.token;
  var note = yield (0, _supertest.default)(_app.default).post("/api/notes").send({
    "title": "NOTE FROM USER",
    "text": "note from user"
  }).set("x-access-token", auth.token);
  note_id = note.body._id;
}));
afterEach( /*#__PURE__*/_asyncToGenerator(function* () {
  yield _model.User.deleteMany({});
  yield _model2.Note.deleteMany({});
}));
afterAll( /*#__PURE__*/_asyncToGenerator(function* () {
  yield (0, _database.closeDB)();
}));
describe("GET /api/notes", () => {
  test("get notes without token", /*#__PURE__*/_asyncToGenerator(function* () {
    var response = yield (0, _supertest.default)(_app.default).get("/api/notes");
    expect(response.body.message).toBe("You need a token");
    expect(response.status).toBe(401);
  }));
  test("get notes with a token", /*#__PURE__*/_asyncToGenerator(function* () {
    var response = yield (0, _supertest.default)(_app.default).get("/api/notes").set("x-access-token", auth.token);
    expect(response.body.length).toBe(1);
    expect(response.body[0]).toHaveProperty("_id");
    expect(response.body[0]).toHaveProperty("title");
    expect(response.body[0]).toHaveProperty("text");
    expect(response.body[0].title).toBe("NOTE FROM USER");
    expect(response.body[0].text).toBe("note from user");
  }));
  test("get a note from another person", /*#__PURE__*/_asyncToGenerator(function* () {
    var response = yield (0, _supertest.default)(_app.default).get("/api/notes/100").set("x-access-token", auth.token);
    expect(response.status).toBe(404);
    expect(response.body.message).toBe("You need a valid Note-Id");
  }));
  test("get one of your nothes", /*#__PURE__*/_asyncToGenerator(function* () {
    var response = yield (0, _supertest.default)(_app.default).get("/api/notes/".concat(note_id)).set("x-access-token", auth.token);
    expect(response.body._id).toBe(note_id);
    expect(response.body.text).toBe("note from user");
    expect(response.body.title).toBe("NOTE FROM USER");
    expect(response.status).toBe(200);
  }));
});
describe("POST /api/notes", () => {
  test("create a note without a tokenID", /*#__PURE__*/_asyncToGenerator(function* () {
    var response = yield (0, _supertest.default)(_app.default).post("/api/notes").send({
      "title": "TITLE",
      "text": "Another text"
    });
    expect(response.body.message).toBe("You need a token");
    expect(response.status).toBe(401);
  }));
  test("create a note with a tokenID", /*#__PURE__*/_asyncToGenerator(function* () {
    var response = yield (0, _supertest.default)(_app.default).post("/api/notes").send({
      "title": "TITLE",
      "text": "Another text"
    }).set("x-access-token", auth.token);
    expect(response.body.text).toBe("Another text");
    expect(response.body.title).toBe("TITLE");
    expect(response.status).toBe(201);
    var notes = yield (0, _supertest.default)(_app.default).get("/api/notes").set("x-access-token", auth.token);
    expect(notes.body.length).toBe(2);
    expect(notes.body[1]).toHaveProperty("title");
    expect(notes.body[1]).toHaveProperty("text");
    expect(notes.body[1].text).toBe("Another text");
    expect(notes.body[1].title).toBe("TITLE");
  }));
});
describe("DELETE /api/notes", () => {
  test("delete a note without a token", /*#__PURE__*/_asyncToGenerator(function* () {
    var response = yield (0, _supertest.default)(_app.default).delete("/api/notes/".concat(note_id));
    expect(response.body.message).toBe("You need a token");
    expect(response.status).toBe(401);
  }));
  test("delete a note with a token", /*#__PURE__*/_asyncToGenerator(function* () {
    var response = yield (0, _supertest.default)(_app.default).delete("/api/notes/".concat(note_id)).set("x-access-token", auth.token);
    expect(response.body).toHaveProperty("note");
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Note deleted");
    var notes = yield (0, _supertest.default)(_app.default).get("/api/notes").set("x-access-token", auth.token);
    expect(notes.body.length).toBe(0);
  }));
  test("delete a note from another_user/invalid_noteid", /*#__PURE__*/_asyncToGenerator(function* () {
    var response = yield (0, _supertest.default)(_app.default).delete("/api/notes/anotherId").set("x-access-token", auth.token);
    expect(response.body.message).toBe("You need a valid Note-Id");
    expect(response.status).toBe(404);
  }));
});
describe("PATCH /api/notes", () => {
  test("update a note without a token", /*#__PURE__*/_asyncToGenerator(function* () {
    var response = yield (0, _supertest.default)(_app.default).patch("/api/notes/".concat(note_id)).send({
      "title": "title updated",
      "text": "text updated"
    });
    expect(response.body.message).toBe("You need a token");
    expect(response.status).toBe(401);
  }));
  test("update a note with a token but without data", /*#__PURE__*/_asyncToGenerator(function* () {
    var response = yield (0, _supertest.default)(_app.default).patch("/api/notes/".concat(note_id)).set("x-access-token", auth.token);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error.length).toBe(2);
  }));
  test("update a note with data", /*#__PURE__*/_asyncToGenerator(function* () {
    var response = yield (0, _supertest.default)(_app.default).patch("/api/notes/".concat(note_id)).send({
      "title": "new title",
      "text": "new text"
    }).set("x-access-token", auth.token);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("title");
    expect(response.body).toHaveProperty("text");
    expect(response.body.title).toBe("new title");
    expect(response.body.text).toBe("new text");
  }));
});