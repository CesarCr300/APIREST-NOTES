"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("dotenv").config();

var _default = {
  JWT_SECRET: process.env.JWT_SECRET,
  MONGOOSE_URL: process.env.MONGOOSE_URL,
  PORT: process.env.PORT
};
exports.default = _default;