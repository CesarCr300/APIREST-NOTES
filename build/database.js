"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connectDB = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _config = _interopRequireDefault(require("./config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var connectDB = _mongoose.default.connect(_config.default.MONGOOSE_URL || "mongodb://localhost:27017/notesApiRest").then(db => console.log("DB CONNECTED")).catch(err => console.log(err));

exports.connectDB = connectDB;