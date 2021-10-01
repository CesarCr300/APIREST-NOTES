"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Note = void 0;

var _mongoose = require("mongoose");

var schema = new _mongoose.Schema({
  text: {
    required: true,
    type: String
  },
  title: {
    required: true,
    type: String
  }
}, {
  timestamps: true,
  versionKey: false
});
var Note = (0, _mongoose.model)("Note", schema);
exports.Note = Note;