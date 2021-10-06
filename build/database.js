"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connectDB = connectDB;
exports.closeDB = closeDB;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _config = _interopRequireDefault(require("./config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var urlMongoose = _config.default.MONGOOSE_URL;

if (process.env.NODE_ENV === 'test') {
  urlMongoose = "mongodb://localhost:27017/notesApiRest-test";
}

function connectDB() {
  return _connectDB.apply(this, arguments);
}

function _connectDB() {
  _connectDB = _asyncToGenerator(function* () {
    yield _mongoose.default.connect(urlMongoose || "mongodb://localhost:27017/notesApiRest");
    console.log("DB CONNECTED");
  });
  return _connectDB.apply(this, arguments);
}

function closeDB() {
  return _closeDB.apply(this, arguments);
}

function _closeDB() {
  _closeDB = _asyncToGenerator(function* () {
    yield _mongoose.default.connection.close();
  });
  return _closeDB.apply(this, arguments);
}