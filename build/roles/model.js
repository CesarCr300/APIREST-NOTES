"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Role = void 0;

var _mongoose = require("mongoose");

// const roles = ['admin', 'user', 'moderator']
//This is here if in the future I want add new Roles.
var roles = ["user"];
var schema = new _mongoose.Schema({
  name: {
    type: String // enum: roles,

  }
}, {
  timestamps: true,
  versionKey: false
});
var Role = (0, _mongoose.model)("Role", schema);
exports.Role = Role;